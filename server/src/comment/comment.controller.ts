import { Body, Controller, Delete, Param, ParseIntPipe, Patch } from "@nestjs/common"
import { CommentService } from "./comment.service"
import { Auth } from "src/auth/guards/auth.guard"
import { CurrentUser } from "src/auth/decorators/current-user.decorator"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { CheckRolesDecorator } from "src/decorators/check-roles.decorator"
import { Role } from "@prisma/client"

@Controller("comments")
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Auth()
	@Patch(":id")
	async createComment(
		@CurrentUser("id") userId: number,
		@Param("id", ParseIntPipe) postId: number,
		@Body() dto: CreateCommentDto
	) {
		return this.commentService.createComment(userId, postId, dto)
	}

	@Auth()
	@CheckRolesDecorator(Role.ADMIN, Role.MANAGER)
	@Delete(":id")
	async deleteComment(@Param("id", ParseIntPipe) id: number) {
		return this.commentService.deleteComment(id)
	}
}
