import { Inject, Injectable } from "@nestjs/common";
import { CreatePostReqDto } from "./dtos";
import { PostEntity, PostTranslationEntity } from "./entities";
import { IPostRepository, IPostService, POST_REPOSITORY_TOKEN, POST_TRANSLATION_REPOSITORY_TOKEN } from "./interfaces";
import { PostTranslationRepository } from "./repositories";

@Injectable()
export class PostService implements IPostService {
    constructor(
        @Inject(POST_REPOSITORY_TOKEN) private readonly postRepository: IPostRepository,
        @Inject(POST_TRANSLATION_REPOSITORY_TOKEN) private readonly postTranslationRepo: PostTranslationRepository
    ) {}

    async create(userId: Uuid, createPostDto: CreatePostReqDto): Promise<PostEntity> {
        const postEntity = await this.postRepository.create({ userId });
        const translations: PostTranslationEntity[] = [];

        for (const createTranslationDto of createPostDto.title) {
            const languageCode = createTranslationDto.languageCode;

            const translationEntity = await this.postTranslationRepo.create({
                postId: postEntity.id,
                languageCode: languageCode,
                title: createTranslationDto.text,
                description: createPostDto.description.find((desc) => desc.languageCode === languageCode)!.text // ensure with compile not fault
            });

            translations.push(translationEntity);
        }

        postEntity.translations = translations;

        return postEntity;
    }
}
