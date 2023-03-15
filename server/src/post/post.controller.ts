import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from "@nestjs/common"
import { PostService } from "./post.service"
import { Auth } from "src/auth/guards/auth.guard"
import { CurrentUser } from "src/auth/decorators/current-user.decorator"
import { CreatePostDto } from "./dto/create-post.dto"
import { OptionalQueryPipe } from "./optional-query.pipe"
import { UpdatePostDto } from "./dto/update-post.dto"

@Controller("posts")
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get()
	async getPosts(@Query("userId", OptionalQueryPipe) userId?: number) {
		return this.postService.getPosts(userId)
	}

	@Get(":id")
	async getPostById(@Param("id", ParseIntPipe) id: number) {
		return this.postService.getPostById(id)
	}

	@Auth()
	@Post()
	async createPost(@CurrentUser("id") id: number, @Body() dto: CreatePostDto) {
		return this.postService.createPost(id, dto)
	}

	@Auth()
	@Patch("like/:id")
	async toggleLike(@CurrentUser("id") userId: number, @Param("id", ParseIntPipe) postId: number) {
		return this.postService.toggleLike(userId, postId)
	}

	@Auth()
	@Patch(":id")
	async updatePost(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
		return this.postService.updatePost(id, dto)
	}

	@Auth()
	@Delete(":id")
	async deletePost(@Param("id", ParseIntPipe) id: number) {
		return this.postService.deletePost(id)
	}
}
