import { ObjectSchema, object, string, ref } from "yup"
import { ChangePasswordFields } from "./types"

export const confirmationSchema: ObjectSchema<ChangePasswordFields> = object({
	currentPassword: string()
		.required("Пароль обязателен для заполнения")
		.min(3, "Пароль должен содержать минимум 3 символов"),
	newPassword: string()
		.required("Пароль обязателен для заполнения")
		.min(3, "Пароль должен содержать минимум 3 символов"),
	confirmNewPassword: string()
		.oneOf([ref("newPassword"), undefined], "Пароли должны совпадать")
		.required("Пожалуйста, подтвердите пароль"),
})
