import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserService } from "../../user/user.service"
import { ConfigService } from "@nestjs/config"
import { User } from "@prisma/client"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get("JWT_SECRET"),
		})
	}

	async validate({ id }: Pick<User, "id">) {
		return this.userService.getUserById(id)
	}
}
