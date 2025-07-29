import { IBaseRepository } from "@repositories";
import { UserEntity, UserSettingEntity } from "../entities";

export const IUSER_REPOSITORY_TOKEN = Symbol();

export interface IUserRepository extends IBaseRepository<UserEntity> {
    findOneWithUserSetting(userId: string, projection?: string): Promise<UserEntity>;

    __brand?: "IUserRepository";
}

export const IUSER_SETTING_REPOSITORY_TOKEN = Symbol();

export interface IUserSettingRepository extends IBaseRepository<UserSettingEntity> {
    __brand?: "IUserSettingRepository";
}
