import { User } from "@prisma/client"

export interface IAuthResponse {
	user: User
	accessToken: string
}
