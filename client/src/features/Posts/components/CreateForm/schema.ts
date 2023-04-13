import { object, string, mixed } from "yup"

export const schema = object().shape({
	title: string().required("Напишите заголовок поста"),
	content: mixed().required("Напишите содержание"),
	file: mixed(),
})

export const fileSchema = object().shape({
	file: mixed()
		.required("File is required")
		.test("fileSize", "Файл должен быть меньше 5 МБ", value => (value ? (value as File).size <= 5e6 : true)),
})
