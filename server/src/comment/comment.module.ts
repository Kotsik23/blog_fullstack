import { Module } from "@nestjs/common"
import { CommentService } from "./comment.service"
import { CommentController } from "./comment.controller"
import { PrismaService } from "src/prisma/prisma.service"
import { AuthModule } from "src/auth/auth.module"

import { PostModule } from "src/post/post.module"

@Module({
	controllers: [CommentController],
	providers: [CommentService, PrismaService],
	imports: [AuthModule, PostModule],
})
export class CommentModule {}
