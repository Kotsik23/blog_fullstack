import { Module } from "@nestjs/common"
import { PostService } from "./post.service"
import { PostController } from "./post.controller"
import { PrismaService } from "../prisma/prisma.service"
import { AuthModule } from "../auth/auth.module"

@Module({
	controllers: [PostController],
	providers: [PostService, PrismaService, AuthModule],
})
export class PostModule {}
