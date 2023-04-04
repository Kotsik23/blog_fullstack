import { ObjectSchema, object, string, mixed } from "yup"
import { CreatePostFields } from "./types"

export const schema: ObjectSchema<CreatePostFields> = object({
	title: string().required("Напишите заголовок поста"),
	file: mixed()
		.required("Выберите файл")
		.test("fileSize", "Файл должен быть меньше 1 МБ", value => (value ? (value as File).size <= 1000000 : true)),
})
