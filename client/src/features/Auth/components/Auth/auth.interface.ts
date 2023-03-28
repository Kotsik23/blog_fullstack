import { IUser } from "shared/types/user"

export interface IAuthFields {
	email: string
	password: string
	isRemember?: boolean
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}

export interface IAuthState {
	user?: IUser | null
	accessToken?: string | null
}

interface IError {
	error: string
	message: string
	statusCode: number
}

export interface IAuthError {
	data: IError
	status: number
}
