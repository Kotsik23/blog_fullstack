import { Injectable } from "@nestjs/common"
import { Role, User } from "@prisma/client"
import { UserService } from "src/user/user.service"

@Injectable()
export class RoleService {
	constructor(private readonly userService: UserService) {}

	async toggleRole(userId: number, role: Role): Promise<Partial<User>> {
		const user = await this.userService.getUserById(userId)

		const isRoleExists = user.roles.includes(role)

		const newRolesArray: Role[] = isRoleExists
			? user.roles.filter(userRole => userRole !== role)
			: [...user.roles, role]

		return this.userService.updateUser(userId, {
			roles: newRolesArray,
		})
	}
}
