import { ObjectSchema, object, string, mixed } from "yup"
import { CreatePostFields } from "./types"

export const schema: ObjectSchema<CreatePostFields> = object({
	title: string().required("Напишите заголовок поста"),
	content: mixed().required("Напишите содержание"),
	file: mixed()
		.required("Выберите файл")
		.test("fileSize", "Файл должен быть меньше 5 МБ", value => (value ? (value as File).size <= 5e6 : true)),
})
