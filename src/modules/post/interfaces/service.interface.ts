import { PostEntity } from "../entities";

export const POST_SERVICE_TOKEN = Symbol();

export interface IPostService {
    create(userId: Uuid, createPostDto: any): Promise<PostEntity>;
}
