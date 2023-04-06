import { IUser } from "./user"

export interface IComment {
	id: number
	createdAt: Date
	body: string
	userId: number
	postId: number
	user: IUser
}
