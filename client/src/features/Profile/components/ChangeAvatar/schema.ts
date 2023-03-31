import { SUPPORTED_FORMATS } from "shared/constants/files"
import { mixed, object } from "yup"

const FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export const fileValidationSchema = mixed()
	.test("fileSize", "Файл слишком большой", value => {
		return !value || (value as File).size <= FILE_SIZE
	})
	.test("fileFormat", "Неподдерживаемый формат", value => {
		return !value || SUPPORTED_FORMATS.includes((value as File).type)
	})

export const changeAvatarSchema = object().shape({
	avatar: fileValidationSchema.required("Необходимо загрузить файл"),
})
