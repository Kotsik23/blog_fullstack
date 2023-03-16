import { Injectable } from "@nestjs/common"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

const FOLDER = "images/"

@Injectable()
export class FileService {
	async uploadFileToFirebase(file: Express.Multer.File) {
		const storage = getStorage()
		const uuidName = uuidv4()
		const imageRef = ref(storage, FOLDER + uuidName)

		await uploadBytes(imageRef, file.buffer, {
			contentType: file.mimetype,
		})

		const downloadUrl = await getDownloadURL(imageRef)
		return {
			url: downloadUrl,
		}
	}

	async deleteFileFromFirebase(imageUrl: string): Promise<void> {
		const storage = getStorage()
		const fileName = imageUrl.substring(imageUrl.indexOf("%") + 3, imageUrl.indexOf("?"))
		const imageRef = ref(storage, FOLDER + fileName)
		await deleteObject(imageRef)
	}
}
