import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity, PostTranslationEntity } from "./entities";
import { POST_REPOSITORY_TOKEN } from "./interfaces";
import { PostRepository } from "./repositories";

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity, PostTranslationEntity])],
    providers: [
        {
            provide: POST_REPOSITORY_TOKEN,
            useClass: PostRepository
        }
    ]
})
export class PostModule {}
