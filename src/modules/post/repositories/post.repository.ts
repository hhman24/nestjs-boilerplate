import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepositoryTypeOrmAbstract } from "@repositories";
import { Repository } from "typeorm";
import { PostEntity } from "../entities";
import { IPostRepository } from "../interfaces";

export class PostRepository extends BaseRepositoryTypeOrmAbstract<PostEntity> implements IPostRepository {
    constructor(
        @InjectRepository(PostEntity)
        repository: Repository<PostEntity>
    ) {
        super(repository);
    }
}
