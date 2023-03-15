import { Controller, Delete, Get, Param, ParseIntPipe } from "@nestjs/common"
import { UserService } from "./user.service"
import { Auth } from "../auth/guards/auth.guard"
import { CheckRolesDecorator } from "../decorators/check-roles.decorator"
import { Role } from "@prisma/client"

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@CheckRolesDecorator(Role.ADMIN, Role.MANAGER)
	@Get()
	async getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Auth()
	@CheckRolesDecorator(Role.ADMIN, Role.MANAGER)
	@Get(":id")
	async getUserById(@Param("id", ParseIntPipe) id: number) {
		return this.userService.getUserById(id)
	}

	@Auth()
	@CheckRolesDecorator(Role.ADMIN, Role.MANAGER)
	@Delete(":id")
	async deleteUser(@Param("id", ParseIntPipe) id: number) {
		return this.userService.deleteUser(id)
	}
}
