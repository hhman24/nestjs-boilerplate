import { CreateUserReqDto } from "../dtos";
import { UserEntity } from "../entities";

export const IUSER_SERVICE_TOKEN = Symbol();

export interface IUserService {
    createUser(dto: CreateUserReqDto): Promise<UserEntity>;
    getUser(userId: string): Promise<UserEntity>;
    // getUsers(): Promise<UserEntity[]>;
    // createSettings(): any;
    // update(): any;
}
