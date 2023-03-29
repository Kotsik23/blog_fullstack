import { ObjectSchema, object, string, ref } from "yup"
import { ChangeEmailFields } from "./types"

export const changeEmailSchema: ObjectSchema<ChangeEmailFields> = object({
	currentEmail: string().email("Неверный формат электронной почты").required("Введите старый email"),
	newEmail: string()
		.email("Неверный формат электронной почты")
		.notOneOf([ref("currentEmail")], "Новый email не может совпадать со старым email")
		.required("Введите новый email"),
})
