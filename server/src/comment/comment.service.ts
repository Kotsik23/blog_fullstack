import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { Comment } from "@prisma/client"
import { PostService } from "src/post/post.service"

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService, private readonly postService: PostService) {}

	async createComment(userId: number, postId: number, dto: CreateCommentDto): Promise<Comment> {
		await this.postService.getPostById(postId)
		return this.prisma.comment.create({
			data: {
				body: dto.body,
				userId,
				postId,
			},
		})
	}

	async deleteComment(id: number): Promise<Comment> {
		return this.prisma.comment.delete({
			where: { id },
		})
	}
}
