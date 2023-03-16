import { Module } from "@nestjs/common"
import { PostService } from "./post.service"
import { PostController } from "./post.controller"
import { PrismaService } from "../prisma/prisma.service"
import { AuthModule } from "../auth/auth.module"
import { FileModule } from "src/file/file.module"

@Module({
	controllers: [PostController],
	providers: [PostService, PrismaService, AuthModule],
	imports: [FileModule],
	exports: [PostService],
})
export class PostModule {}
