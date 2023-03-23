import { object, ObjectSchema, string } from "yup"
import { IAuthFields } from "../types/auth.interface"

export const authScheme: ObjectSchema<IAuthFields> = object({
	email: string().required("Email is a required field").email("Please provide a correct email"),
	password: string()
		.required("Password is a required field")
		.min(3, "Password is too short")
		.max(50, "Password is too long"),
})
