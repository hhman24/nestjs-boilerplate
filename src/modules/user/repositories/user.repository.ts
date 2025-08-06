import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepositoryTypeOrmAbstract } from "@repositories";
import { Repository } from "typeorm";
import { UserEntity } from "../entities";
import { IUserRepository } from "../interfaces";

@Injectable()
export class UserRepository extends BaseRepositoryTypeOrmAbstract<UserEntity> implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        repository: Repository<UserEntity>
    ) {
        super(repository);
    }

    async findOneWithUserSetting(userId: string, projection = ""): Promise<UserEntity> {
        const select = projection ? (projection.split(" ") as (keyof UserEntity)[]) : undefined;

        return this.repository.findOne({
            where: { id: userId },
            select: select,
            relations: ["user_setting"]
        });
    }
}
