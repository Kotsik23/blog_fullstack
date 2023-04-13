import { IsOptional, IsString } from "class-validator"

export class GetPostParams {
	@IsOptional()
	@IsString()
	page?: string

	@IsOptional()
	@IsString()
	perPage?: string
}
