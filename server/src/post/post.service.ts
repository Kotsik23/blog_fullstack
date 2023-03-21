import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Post, Prisma } from "@prisma/client"
import { CreatePostDto } from "./dto/create-post.dto"
import { UpdatePostDto } from "./dto/update-post.dto"
import { FileService } from "src/file/file.service"

@Injectable()
export class PostService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly filesService: FileService
	) {}

	async getPosts(userId: number, limit: number): Promise<Post[]> {
		return this.prisma.post.findMany({
			where: {
				userId,
			},
			include: {
				author: {
					select: {
						id: true,
						email: true,
					},
				},
				_count: {
					select: {
						likes: true,
						comments: true,
					},
				},
			},
			take: limit,
		})
	}

	async getPostById(id: number) {
		return this.prisma.post.findUniqueOrThrow({
			where: { id },
			include: {
				author: {
					select: {
						id: true,
						email: true,
					},
				},
				comments: {
					include: {
						user: {
							select: {
								id: true,
								email: true,
							},
						},
					},
				},
				likes: {
					select: {
						id: true,
						email: true,
						roles: true,
					},
				},
			},
		})
	}

	async createPost(userId: number, dto: CreatePostDto, image: Express.Multer.File): Promise<Post> {
		const loadedImage = await this.filesService.uploadFileToFirebase(image)

		return this.prisma.post.create({
			data: {
				title: dto.title,
				content: dto.title,
				imageUrl: loadedImage.url,
				author: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
		if (dto.imageUrl) {
			const post = await this.getPostById(id)
			const oldImageUrl = post.imageUrl
			await this.filesService.deleteFileFromFirebase(oldImageUrl)
		}

		return this.prisma.post.update({
			where: { id },
			data: dto,
		})
	}

	async deletePost(id: number): Promise<Post> {
		const post = await this.prisma.post.delete({
			where: { id },
		})
		await this.filesService.deleteFileFromFirebase(post.imageUrl)
		return post
	}

	async toggleLike(userId: number, postId: number): Promise<Post> {
		const post = await this.prisma.post.findUniqueOrThrow({
			where: { id: postId },
			include: {
				likes: true,
			},
		})

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
				_count: {
					select: { likes: true },
				},
			},
		})
	}
}
