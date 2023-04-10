export interface IAuthor {
	id: number
	createdAt: Date
	updatedAt: Date
	email: string
	password: string
	rtHash: null
	avatarUrl: string
	roles: string[]
	_count: Statistics
}

interface Statistics {
	comments: number
	likedPosts: number
	posts: number
}

export interface AuthorPost {
	id: number
	createdAt: Date
	updatedAt: Date
	title: string
	content: string
	imageUrl: string
	userId: number
	author: Author
	_count: Count
}

interface Count {
	likes: number
	comments: number
}

interface Author {
	id: number
	email: string
}
