import { Body, Controller, Param, ParseIntPipe, Patch } from "@nestjs/common"
import { RoleService } from "./role.service"
import { Auth } from "src/auth/guards/auth.guard"
import { CheckRolesDecorator } from "src/decorators/check-roles.decorator"
import { Role } from "@prisma/client"
import { ToggleRoleDto } from "./dto/roggle-role.dto"

@Controller("roles")
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Auth()
	@CheckRolesDecorator(Role.ADMIN)
	@Patch(":id")
	async toggleRole(@Param("id", ParseIntPipe) id: number, @Body() dto: ToggleRoleDto) {
		return this.roleService.toggleRole(id, dto.role)
	}
}
