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
				author: true,
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
		const loadedImage = await this.filesService.uploadFileToFirebase("post", image)

		return this.prisma.post.create({
			data: {
				title: dto.title,
				content: dto.content,
				imageUrl: loadedImage.url,
				author: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	async updatePost(id: number, dto: UpdatePostDto, image?: Express.Multer.File): Promise<Post> {
		if (image) {
			const post = await this.prisma.post.findUnique({ where: { id } })
			await this.filesService.deleteFileFromFirebase(post.imageUrl)
			const { url } = await this.filesService.uploadFileToFirebase("post", image)
			return this.prisma.post.update({
				where: { id },
				data: {
					...dto,
					imageUrl: url,
				},
			})
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
				likes: true,
			},
		})
	}
}
