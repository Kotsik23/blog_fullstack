import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"
import { CreateUserDto } from "../user/dto/create-user.dto"
import { User } from "@prisma/client"
import { compare, genSalt, hash } from "bcrypt"
import { Response, Request } from "express"
import { ITokensPayload } from "./interfaces/tokens-payload.interface"
import { ITokensSet } from "./interfaces/tokens-set.interface"
import { IAuthResponse } from "./interfaces/AuthResponse.interface"
import { UpdateUserDto } from "../user/dto/update-user.dto"
import { FileService } from "src/file/file.service"

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly fileService: FileService
	) {}

	async register(dto: CreateUserDto, res: Response): Promise<IAuthResponse> {
		const candidate = await this.userService.getUserByEmail(dto.email)

		if (candidate) {
			throw new BadRequestException("Such user is already exists")
		}

		const salt = await genSalt(5)
		const hashedPassword = await hash(dto.password, salt)

		let user = await this.userService.createUser({
			...dto,
			password: hashedPassword,
		})

		const tokens = await this.generateTokens({ id: user.id, roles: user.roles })

		user = await this.userService.setRtTokenHash(user.id, tokens.refreshToken)
		this.setRefreshTokenToCookie(res, tokens.refreshToken)
		this.userService.excludeFields(user, ["password", "rtHash"])

		return {
			user,
			accessToken: tokens.accessToken,
		}
	}

	async login(dto: CreateUserDto, res: Response): Promise<IAuthResponse> {
		let user = await this.validateUser(dto)
		const tokens = await this.generateTokens({ id: user.id, roles: user.roles })

		user = await this.userService.setRtTokenHash(user.id, tokens.refreshToken)
		this.setRefreshTokenToCookie(res, tokens.refreshToken)
		this.userService.excludeFields(user, ["password", "rtHash"])

		return {
			user,
			accessToken: tokens.accessToken,
		}
	}

	async logout(req: Request, res: Response) {
		const { user } = await this.checkRefreshToken(req)

		await this.userService.removeRtTokenHash(user.id)
		res.clearCookie("jwtRefreshToken", { httpOnly: true })

		return { message: "Successfully logged out" }
	}

	async refresh(req: Request, res: Response): Promise<IAuthResponse> {
		try {
			const { user, refreshToken } = await this.checkRefreshToken(req)

			const isRtMatches = await compare(refreshToken, user.rtHash)

			if (!isRtMatches) {
				throw new UnauthorizedException("Unauthorized")
			}

			const tokens = await this.generateTokens({ id: user.id, roles: user.roles })
			await this.userService.setRtTokenHash(user.id, tokens.refreshToken)
			this.setRefreshTokenToCookie(res, tokens.refreshToken)
			this.userService.excludeFields(user, ["password", "rtHash"])

			return {
				user,
				accessToken: tokens.accessToken,
			}
		} catch (error) {
			throw new UnauthorizedException(error.message)
		}
	}

	async updateProfile(id: number, data: UpdateUserDto): Promise<User> {
		if (data.email) {
			const isExists = await this.userService.getUserByEmail(data.email)

			if (isExists) {
				throw new BadRequestException("Such email is already exists")
			}
			return this.userService.updateUser(id, { email: data.email })
		}

		if (data.password && data.oldPassword) {
			let user = await this.userService.getUserById(id)
			const isEquals = await compare(data.oldPassword, user.password)

			if (!isEquals) {
				throw new BadRequestException("Incorrect old password")
			}

			const salt = await genSalt(5)
			const hashedPassword = await hash(data.password, salt)

			user = await this.userService.updateUser(id, { password: hashedPassword })
			this.userService.excludeFields(user, ["password", "rtHash"])

			return user
		}
	}

	async updateProfileAvatar(id: number, avatar: Express.Multer.File) {
		const user = await this.userService.getUserById(id)
		await this.fileService.deleteFileFromFirebase(user.avatarUrl)
		const loadedImage = await this.fileService.uploadFileToFirebase("avatar", avatar)
		return await this.userService.updateUser(id, { avatarUrl: loadedImage.url })
	}

	async getProfile(req: Request): Promise<User> {
		try {
			const { user } = await this.checkRefreshToken(req)
			this.userService.excludeFields(user, ["password", "rtHash"])

			return user
		} catch (error) {
			throw new UnauthorizedException(error.message)
		}
	}

	private async generateTokens(payload: ITokensPayload): Promise<ITokensSet> {
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: "1h",
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: "30d",
		})

		return {
			accessToken,
			refreshToken,
		}
	}

	private async checkRefreshToken(req: Request) {
		const refreshToken = req.cookies?.jwtRefreshToken

		if (!refreshToken) {
			throw new UnauthorizedException("Unauthorized")
		}

		const userFromToken = await this.jwtService.verify<User>(refreshToken)
		const user = await this.userService.getUserById(userFromToken.id)

		if (!userFromToken || !user) {
			throw new UnauthorizedException("Unauthorized")
		}

		return {
			user,
			refreshToken,
		}
	}

	private setRefreshTokenToCookie(res: Response, refreshToken: string): Response {
		return res.cookie("jwtRefreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 30 * 24 * 3600 * 1000,
		})
	}

	private async validateUser(dto: CreateUserDto): Promise<User> {
		const user = await this.userService.getUserByEmail(dto.email)

		if (!user) {
			throw new BadRequestException("Invalid email or password")
		}

		const isEquals = await compare(dto.password, user.password)

		if (!isEquals) {
			throw new BadRequestException("Invalid email or password")
		}

		return user
	}
}
