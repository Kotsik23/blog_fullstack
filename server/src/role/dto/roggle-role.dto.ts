import { Role } from "@prisma/client"
import { IsEnum } from "class-validator"

export class ToggleRoleDto {
	@IsEnum(Role)
	role: Role
}
