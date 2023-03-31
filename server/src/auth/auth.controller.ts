import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	ParseFilePipe,
	Patch,
	Post,
	Req,
	Res,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateUserDto } from "../user/dto/create-user.dto"
import { Response, Request } from "express"
import { Auth } from "./guards/auth.guard"
import { CurrentUser } from "./decorators/current-user.decorator"
import { UpdateUserDto } from "../user/dto/update-user.dto"
import { FileInterceptor } from "@nestjs/platform-express"

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.register(dto, res)
	}

	@Post("login")
	async login(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.login(dto, res)
	}

	@Get("refresh")
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return this.authService.refresh(req, res)
	}

	@Auth()
	@Get("profile")
	async getProfile(@Req() req: Request) {
		return this.authService.getProfile(req)
	}

	@Auth()
	@Patch("profile")
	async updateProfile(@CurrentUser("id") id: number, @Body() data: UpdateUserDto) {
		return this.authService.updateProfile(id, data)
	}

	@Auth()
	@Patch("profile/avatar")
	@UseInterceptors(FileInterceptor("image"))
	async updateProfileAvatar(
		@CurrentUser("id") id: number,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 10e6 }),
					new FileTypeValidator({ fileType: new RegExp("^image/(jpeg|png|jpg)$") }),
				],
			})
		)
		image: Express.Multer.File
	) {
		return this.authService.updateProfileAvatar(id, image)
	}

	@Auth()
	@Delete("profile")
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return this.authService.logout(req, res)
	}
}
