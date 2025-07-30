import { Injectable } from "@nestjs/common";
import { BaseRepositoryTypeOrmAbstract } from "@repositories";
import { PostTranslationEntity } from "../entities";
import { IPostTranslationRepository } from "../interfaces";

@Injectable()
export class PostTranslationRepository extends BaseRepositoryTypeOrmAbstract<PostTranslationEntity> implements IPostTranslationRepository {}
