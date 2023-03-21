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

export interface IPostOne extends IPost {
	author: Author
	comments: Comment[]
	likes: Like[]
}

interface Like extends Author {
	roles: string[]
}

interface Comment {
	id: number
	createdAt: Date
	body: string
	userId: number
	postId: number
	user: Author
}

interface Statistics {
	likes: number
	comments: number
}

interface Author {
	id: number
	email: string
}
