import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { RoleModule } from './role/role.module';
import { FileModule } from './file/file.module';
@Module({
	imports: [PrismaModule, UserModule, AuthModule, PostModule, CommentModule, RoleModule, FileModule],
})
export class AppModule {}
