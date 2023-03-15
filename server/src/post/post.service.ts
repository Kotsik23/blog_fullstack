import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Post, Prisma } from "@prisma/client"
import { CreatePostDto } from "./dto/create-post.dto"
import { UpdatePostDto } from "./dto/update-post.dto"
import { ReturnUserObject } from "src/shared/return-objects"

@Injectable()
export class PostService {
	constructor(private readonly prisma: PrismaService) {}

	async getPosts(userId?: number): Promise<Post[]> {
		return this.prisma.post.findMany({
			where: {
				userId,
			},
			include: {
				author: {
					select: ReturnUserObject,
				},
				likes: {
					select: ReturnUserObject,
				},
				comments: true,
			},
		})
	}

	async getPostById(id: number) {
		return this.prisma.post.findUniqueOrThrow({
			where: { id },
			include: {
				author: true,
				likes: true,
				comments: true,
			},
		})
	}

	async createPost(userId: number, dto: CreatePostDto): Promise<Post> {
		return this.prisma.post.create({
			data: {
				title: dto.title,
				content: dto.title,
				author: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
		return this.prisma.post.update({
			where: { id },
			data: dto,
		})
	}

	async deletePost(id: number): Promise<Post> {
		return this.prisma.post.delete({
			where: { id },
		})
	}

	async toggleLike(userId: number, postId: number): Promise<Post> {
		const post = await this.getPostById(postId)

		const isLiked = post.likes.some(user => user.id === userId)

		return await this.prisma.post.update({
			where: { id: postId },
			data: {
				likes: {
					[isLiked ? "disconnect" : "connect"]: {
						id: userId,
					},
				},
			},
			include: {
				likes: {
					select: ReturnUserObject,
				},
			},
		})
	}
}
