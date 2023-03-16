import { Injectable } from "@nestjs/common"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class FileService {
	async uploadFileToFirebase(file: Express.Multer.File) {
		const folder = "images/"
		const storage = getStorage()

		const uuidName = uuidv4()

		const imageRef = ref(storage, folder + uuidName)

		await uploadBytes(imageRef, file.buffer, {
			contentType: file.mimetype,
		})

		const downloadUrl = await getDownloadURL(imageRef)

		return {
			url: downloadUrl,
		}
	}
}
