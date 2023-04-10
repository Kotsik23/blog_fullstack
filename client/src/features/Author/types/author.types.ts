export interface IAuthor {
	id: number
	createdAt: Date
	updatedAt: Date
	email: string
	password: string
	rtHash: null
	avatarUrl: string
	roles: string[]
	_count: Count
}

export interface Count {
	comments: number
	likedPosts: number
	posts: number
}
