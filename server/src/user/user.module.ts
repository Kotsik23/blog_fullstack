import { Module, forwardRef } from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { PrismaService } from "../prisma/prisma.service"
import { AuthModule } from "src/auth/auth.module"

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService],
	exports: [UserService],
	imports: [forwardRef(() => AuthModule)],
})
export class UserModule {}
