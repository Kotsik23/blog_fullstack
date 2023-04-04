import { SUPPORTED_FORMATS } from "shared/constants/files"
import { mixed, object, ObjectSchema } from "yup"
import { ChangeAvatarFields } from "./types"

const FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export const changeAvatarSchema: ObjectSchema<ChangeAvatarFields> = object({
	avatar: mixed()
		.required("Выберите файл")
		.test("fileSize", "Файл должен быть меньше 5 МБ", value => (value ? (value as File).size <= FILE_SIZE : true)),
})
