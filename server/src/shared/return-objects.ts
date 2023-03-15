import { Prisma } from "@prisma/client"

export const ReturnUserObject: Prisma.UserSelect = {
	id: true,
	email: true,
	createdAt: true,
	updatedAt: true,
	roles: true,
	comments: true,
	likedPosts: true,
	posts: true,
}
