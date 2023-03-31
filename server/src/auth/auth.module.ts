import { forwardRef, Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { getJwtConfig } from "../config/jwt.config"
import { UserModule } from "../user/user.module"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { FileModule } from "src/file/file.module"

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	imports: [
		forwardRef(() => UserModule),
		FileModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
