import { PartialType } from "@nestjs/mapped-types"
import { CreateUserDto } from "./create-user.dto"
import { IsOptional, IsString, Length } from "class-validator"

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsOptional()
	@IsString()
	@Length(3, 50)
	oldPassword?: string
}
