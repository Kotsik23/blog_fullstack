import {
	Controller,
	FileTypeValidator,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common"
import { FileService } from "./file.service"
import { FileInterceptor } from "@nestjs/platform-express"

@Controller("files")
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post()
	@UseInterceptors(FileInterceptor("image"))
	async uploadFile(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 10e6 }),
					new FileTypeValidator({ fileType: "image/jpeg" }),
				],
			})
		)
		file: Express.Multer.File
	) {
		return this.fileService.uploadFileToFirebase("image", file)
	}
}
