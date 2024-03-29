import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { Response } from "express"

@Catch(PrismaClientKnownRequestError)
export class PrismaClientKnowRequestErrorFilter extends BaseExceptionFilter {
	catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
		console.error(exception.message)
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const message = exception.meta?.cause
		const error = exception.message.replace(/\n/g, "")

		console.log(exception)

		switch (exception.code) {
			case "P2025": {
				const status = HttpStatus.NOT_FOUND
				response.status(status).json({
					statusCode: status,
					message: message ?? error,
				})
				break
			}
			case "P2002": {
				const status = HttpStatus.CONFLICT
				response.status(status).json({
					statusCode: status,
					message: message ?? error,
				})
				break
			}
			default:
				// default 500 error code
				super.catch(exception, host)
				break
		}
	}
}
