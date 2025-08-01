import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepositoryTypeOrmAbstract } from "@repositories";
import { Repository } from "typeorm";
import { PostTranslationEntity } from "../entities";
import { IPostTranslationRepository } from "../interfaces";

@Injectable()
export class PostTranslationRepository extends BaseRepositoryTypeOrmAbstract<PostTranslationEntity> implements IPostTranslationRepository {
    constructor(
        @InjectRepository(PostTranslationEntity)
        repository: Repository<PostTranslationEntity>
    ) {
        super(repository);
    }
}
