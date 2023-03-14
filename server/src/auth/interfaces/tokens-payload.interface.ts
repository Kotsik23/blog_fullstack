import { Role } from "@prisma/client"

export interface ITokensPayload {
	id: number
	roles: Role[]
}