import { IUser } from "./user"

export interface IPost {
	id: number
	createdAt: Date
	updatedAt: Date
	title: string
	content: string
	imageUrl: string
	userId: number
}

export interface IPostAll extends IPost {
	author: Author
	_count: Statistics
}

export interface IPostAllResponse {
	posts: IPostAll[]
	total: 0
}

export interface IPostOne extends IPost {
	author: IUser
	likes: IUser[]
}

interface Statistics {
	likes: number
	comments: number
}

export interface Author {
	id: number
	email: string
}
