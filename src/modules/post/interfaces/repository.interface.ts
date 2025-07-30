import { IBaseRepository } from "@repositories";
import { PostEntity } from "../entities";

export const POST_REPOSITORY_TOKEN = Symbol();

export interface IPostRepository extends IBaseRepository<PostEntity> {
    __brand?: "IPostRepository";
}
