import { Controller, Delete, Get, Param, ParseIntPipe, Patch } from "@nestjs/common"
import { UserService } from "./user.service"
import { Auth } from "../auth/guards/auth.guard"
import { CheckRolesDecorator } from "../decorators/check-roles.decorator"
import { Role } from "@prisma/client"
import { CurrentUser } from "src/auth/decorators/current-user.decorator"

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@CheckRolesDecorator(Role.ADMIN, Role.MANAGER)
	@Get()
	async getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Get(":id")
	async getAuthorInfo(@Param("id", ParseIntPipe) id: number) {
		return this.userService.getAuthorInfo(id)
	}

	@Auth()
	@Patch(":id")
	async subscribeToAuthor(
		@CurrentUser("id") userId: number,
		@Param("id", ParseIntPipe) id: number
	) {
		return this.userService.subscribeToAuthor(userId, id)
	}

	@Auth()
	@CheckRolesDecorator(Role.ADMIN, Role.MANAGER)
	@Delete(":id")
	async deleteUser(@Param("id", ParseIntPipe) id: number) {
		return this.userService.deleteUser(id)
	}
}
