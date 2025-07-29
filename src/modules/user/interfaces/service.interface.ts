import { CreateUserReqDto } from "../dtos";
import { UserEntity } from "../entities";

export const IUSER_SERVICE_TOKEN = Symbol();

export interface IUserService {
    createUser(dto: CreateUserReqDto): Promise<UserEntity>;
    // getUsers(): Promise<UserEntity[]>;
    // getUser(): any;
    // createSettings(): any;
    // update(): any;
}
