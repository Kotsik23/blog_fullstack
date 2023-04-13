import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common"

@Injectable()
export class FileValidationPipe implements PipeTransform {
	transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
		if (!value) {
			return null
		}

		const formats = ["image/jpeg", "image/jpg", "image/png"]
		const size = 5 * 1024 * 1024

		if (value.size > size) {
			throw new BadRequestException("File size is too large. Max - 5Mb")
		}

		if (!formats.includes(value.mimetype)) {
			throw new BadRequestException("Invalid file format.")
		}
		return value
	}
}
