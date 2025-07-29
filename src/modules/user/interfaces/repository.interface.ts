import { IBaseRepository } from "@repositories";
import { UserEntity, UserSettingEntity } from "../entities";

export const USER_REPOSITORY_TOKEN = Symbol();

export interface IUserRepository extends IBaseRepository<UserEntity> {
    findOneWithUserSetting(userId: string, projection?: string): Promise<UserEntity>;

    __brand?: "IUserRepository";
}

export const USER_SETTING_REPOSITORY_TOKEN = Symbol();

export interface IUserSettingRepository extends IBaseRepository<UserSettingEntity> {
    __brand?: "IUserSettingRepository";
}
