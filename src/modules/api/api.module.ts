import { PostModule } from "@modules/post/post.module";
import { UserModule } from "@modules/user/user.module";
import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { UserController } from "./user.controller";

@Module({
    imports: [UserModule, PostModule],
    controllers: [UserController, PostController]
})
export class ApiModule {}
