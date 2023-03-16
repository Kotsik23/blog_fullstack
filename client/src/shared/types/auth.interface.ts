import { IUser } from "./user.interface"

export interface IAuthFields {
	email: string
	password: string
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}

export interface IAuthState {
	user?: IUser | null
	accessToken?: string | null
}
