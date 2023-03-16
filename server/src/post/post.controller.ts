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

@Controller("posts")
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get()
	async getPosts(
		@Query("userId") userId: string,
		@Query("limit", new DefaultValuePipe(15), ParseIntPipe) limit: number
	) {
		return this.postService.getPosts(Number(userId) || undefined, limit)
	}

	@Get(":id")
	async getPostById(@Param("id", ParseIntPipe) id: number) {
		return this.postService.getPostById(id)
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
	async updatePost(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
		return this.postService.updatePost(id, dto)
	}

	@Auth()
	@Delete(":id")
	async deletePost(@Param("id", ParseIntPipe) id: number) {
		return this.postService.deletePost(id)
	}
}
