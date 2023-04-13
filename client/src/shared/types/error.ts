interface IError {
	error: string
	message: string
	statusCode: number
}

export interface ApiError {
	data: IError
	status: number
}
