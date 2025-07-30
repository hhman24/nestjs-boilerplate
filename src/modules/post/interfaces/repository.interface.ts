import { IBaseRepository } from "@repositories";
import { PostEntity, PostTranslationEntity } from "../entities";

export const POST_REPOSITORY_TOKEN = Symbol();

export interface IPostRepository extends IBaseRepository<PostEntity> {
    __brand?: "IPostRepository";
}

export const POST_TRANSLATION_REPOSITORY_TOKEN = Symbol();
export interface IPostTranslationRepository extends IBaseRepository<PostTranslationEntity> {
    __brand?: "IPostTranslationRepository";
}
