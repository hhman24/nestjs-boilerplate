import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity, PostTranslationEntity } from "./entities";
import { POST_REPOSITORY_TOKEN, POST_SERVICE_TOKEN, POST_TRANSLATION_REPOSITORY_TOKEN } from "./interfaces";
import { PostService } from "./post.service";
import { PostRepository, PostTranslationRepository } from "./repositories";

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity, PostTranslationEntity])],
    providers: [
        {
            provide: POST_REPOSITORY_TOKEN,
            useClass: PostRepository
        },
        {
            provide: POST_TRANSLATION_REPOSITORY_TOKEN,
            useClass: PostTranslationRepository
        },
        {
            provide: POST_SERVICE_TOKEN,
            useClass: PostService
        }
    ],
    exports: [POST_SERVICE_TOKEN]
})
export class PostModule {}
