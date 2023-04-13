import { Module } from "@nestjs/common"
import { PostService } from "./post.service"
import { PostController } from "./post.controller"
import { PrismaService } from "../prisma/prisma.service"
import { AuthModule } from "../auth/auth.module"
import { FileModule } from "src/file/file.module"
import { PaginationModule } from "src/pagination/pagination.module"

@Module({
	controllers: [PostController],
	providers: [PostService, PrismaService, AuthModule],
	imports: [FileModule, PaginationModule],
	exports: [PostService],
})
export class PostModule {}
