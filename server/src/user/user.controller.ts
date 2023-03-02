import { Controller, Delete, Get, Param, ParseIntPipe } from "@nestjs/common"
import { UserService } from "./user.service"

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Get(":id")
	async getUserById(@Param("id", ParseIntPipe) id: number) {
		return this.userService.getUserById(id)
	}

	@Delete(":id")
	async deleteUser(@Param("id", ParseIntPipe) id: number) {
		return this.userService.deleteUser(id)
	}
}
