import { Module } from "@nestjs/common"
import { RoleService } from "./role.service"
import { RoleController } from "./role.controller"
import { AuthModule } from "src/auth/auth.module"
import { UserModule } from "src/user/user.module"

@Module({
	controllers: [RoleController],
	providers: [RoleService],
	imports: [AuthModule, UserModule],
})
export class RoleModule {}
