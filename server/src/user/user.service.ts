import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "../prisma/prisma.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { genSalt, hash } from "bcrypt"
import { ReturnUserObject } from "src/shared/return-objects"

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(dto: CreateUserDto): Promise<User> {
		return this.prisma.user.create({
			data: dto,
		})
	}

	async getAllUsers(): Promise<Partial<User>[]> {
		return this.prisma.user.findMany({
			select: ReturnUserObject,
		})
	}

	async getUserById(id: number): Promise<User> {
		return this.prisma.user.findUniqueOrThrow({
			where: { id },
		})
	}

	async getUserByEmail(email: string): Promise<User> {
		return this.prisma.user.findFirst({
			where: { email },
		})
	}

	async deleteUser(id: number): Promise<User> {
		return this.prisma.user.delete({
			where: { id },
		})
	}

	async updateUser(id: number, dto: UpdateUserDto) {
		return this.prisma.user.update({
			where: { id },
			data: dto,
		})
	}

	async getAuthorInfo(id: number) {
		return this.prisma.user.findUniqueOrThrow({
			where: { id },
			include: {
				_count: {
					select: {
						comments: true,
						likedPosts: true,
						posts: true,
					},
				},
			},
		})
	}

	excludeFields<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
		for (let key of keys) {
			delete user[key]
		}
		return user
	}

	async setRtTokenHash(userId: number, refreshToken: string): Promise<User> {
		const salt = await genSalt(5)
		const rtHash = await hash(refreshToken, salt)

		return this.prisma.user.update({
			where: { id: userId },
			data: { rtHash },
		})
	}

	async removeRtTokenHash(userId: number): Promise<User> {
		return this.prisma.user.update({
			where: { id: userId },
			data: { rtHash: null },
		})
	}
}
