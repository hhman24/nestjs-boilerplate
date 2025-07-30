import { BaseRepositoryTypeOrmAbstract } from "@repositories";
import { PostEntity } from "../entities";
import { IPostRepository } from "../interfaces";

export class PostRepository extends BaseRepositoryTypeOrmAbstract<PostEntity> implements IPostRepository {}
