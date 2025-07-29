import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepositoryTypeOrmAbstract } from "@repositories";
import { Repository } from "typeorm";
import { UserSettingEntity } from "../entities";
import { IUserSettingRepository } from "../interfaces";

@Injectable()
export class UserSettingRepository extends BaseRepositoryTypeOrmAbstract<UserSettingEntity> implements IUserSettingRepository {
    constructor(
        @InjectRepository(UserSettingEntity)
        repository: Repository<UserSettingEntity>
    ) {
        super(repository);
    }
}
