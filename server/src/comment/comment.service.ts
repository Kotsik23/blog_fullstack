import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { Comment } from "@prisma/client"

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService) {}

	async createComment(userId: number, postId: number, dto: CreateCommentDto): Promise<Comment> {
		return this.prisma.comment.create({
			data: {
				body: dto.body,
				postId,
				userId,
			},
		})
	}

	async deleteComment(id: number): Promise<Comment> {
		return this.prisma.comment.delete({
			where: { id },
		})
	}
}
