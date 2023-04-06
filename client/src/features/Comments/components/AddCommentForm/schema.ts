import { CreateCommentPayload } from "features/Comments/types/comment.interface"
import { object, ObjectSchema, string } from "yup"

export const createCommentSchema: ObjectSchema<Pick<CreateCommentPayload, "body">> = object({
	body: string()
		.required("Это поле обязательно для заполнения")
		.min(3, "Комментарий слишком короткий, минимум 3 символа"),
})
