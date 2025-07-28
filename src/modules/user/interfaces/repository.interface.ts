import { IBaseRepository } from "@repositories";
import { UserEntity } from "../entities";

export const IUSER_REPOSITORY_TOKEN = Symbol();

export interface IUserRepository extends IBaseRepository<UserEntity> {
    __brand?: "IUserRepository";
}
