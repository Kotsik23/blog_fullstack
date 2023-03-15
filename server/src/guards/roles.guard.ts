import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Reflector } from "@nestjs/core"
import { Observable } from "rxjs"
import { Role, User } from "@prisma/client"
import { ROLES_KEY } from "../decorators/roles.decorator"
import { Request } from "express"

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
				context.getHandler(),
				context.getClass(),
			])

			if (!requiredRoles) return true

			const request = context.switchToHttp().getRequest<Request>()

			const authHeader = request.headers.authorization

			if (!authHeader) {
				throw new UnauthorizedException("Unauthorized")
			}

			const bearer = authHeader.split(" ")[0]
			const token = authHeader.split(" ")[1]

			if (!bearer || !token) {
				throw new UnauthorizedException("Unauthorized")
			}

			const user = this.jwtService.verify<User>(token)
			request.user = user

			return user.roles.some(role => requiredRoles.includes(role))
		} catch (error) {
			throw new UnauthorizedException(error.message)
		}
	}
}
