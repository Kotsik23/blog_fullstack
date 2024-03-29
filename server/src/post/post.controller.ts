import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common"
import { PostService } from "./post.service"
import { Auth } from "src/auth/guards/auth.guard"
import { CurrentUser } from "src/auth/decorators/current-user.decorator"
import { CreatePostDto } from "./dto/create-post.dto"
import { UpdatePostDto } from "./dto/update-post.dto"
import { FileInterceptor } from "@nestjs/platform-express"
import { FileValidationPipe } from "src/pipes/FileValidationPipe"
import { GetPostParams } from "./dto/get-posts-params.dto"

@Controller("posts")
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get()
	async getPosts(@Query() params: GetPostParams) {
		return this.postService.getPosts(params)
	}

	@Get(":id")
	async getPostById(@Param("id", ParseIntPipe) id: number) {
		return this.postService.getPostById(id)
	}

	@Get("user/:id")
	async getPostByUser(@Param("id", ParseIntPipe) id: number) {
		return this.postService.getUserPosts(id)
	}

	@Auth()
	@Post()
	@UseInterceptors(FileInterceptor("image"))
	async createPost(
		@CurrentUser("id") id: number,
		@Body() dto: CreatePostDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 10e6 }),
					new FileTypeValidator({ fileType: "image/jpeg" }),
				],
			})
		)
		image: Express.Multer.File
	) {
		return this.postService.createPost(id, dto, image)
	}

	@Auth()
	@Patch("like/:id")
	async toggleLike(@CurrentUser("id") userId: number, @Param("id", ParseIntPipe) postId: number) {
		return this.postService.toggleLike(userId, postId)
	}

	@Auth()
	@Patch(":id")
	@UseInterceptors(FileInterceptor("image"))
	async updatePost(
		@Param("id", ParseIntPipe) id: number,
		@Body() dto: UpdatePostDto,
		@UploadedFile(FileValidationPipe)
		image?: Express.Multer.File
	) {
		return this.postService.updatePost(id, dto, image)
	}

	@Auth()
	@Delete(":id")
	async deletePost(@Param("id", ParseIntPipe) id: number) {
		return this.postService.deletePost(id)
	}
}
