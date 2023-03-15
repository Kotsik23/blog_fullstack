import { Role } from "@prisma/client"
import { applyDecorators, UseGuards } from "@nestjs/common"
import { RolesDecorator } from "./roles.decorator"
import { RolesGuard } from "../guards/roles.guard"

export const CheckRolesDecorator = (...roles: Role[]) => {
	return applyDecorators(RolesDecorator(...roles), UseGuards(RolesGuard))
}
