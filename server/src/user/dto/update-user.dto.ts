import { PartialType } from "@nestjs/mapped-types"
import { CreateUserDto } from "./create-user.dto"
import { IsArray, IsEnum, IsOptional, IsString, Length } from "class-validator"
import { Prisma, Role } from "@prisma/client"

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsOptional()
	@IsString()
	@Length(3, 50)
	oldPassword?: string

	@IsOptional()
	@IsArray()
	@IsEnum(Role, { each: true })
	roles?: Role[]
}
