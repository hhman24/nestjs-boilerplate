import { PostEntity } from "../entities";

export const POST_SERVICE_TOKEN = Symbol();

export interface IPostService {
    create(userId: string, createPostDto: any): Promise<PostEntity>;
}
