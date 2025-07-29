import { ResourceNotFoundException } from "@exceptions";
import { Inject, Injectable } from "@nestjs/common";
import { CreateUserReqDto } from "./dtos";
import { UserEntity } from "./entities";
import { IUSER_REPOSITORY_TOKEN, IUserRepository, IUserService } from "./interfaces";

@Injectable()
export class UserService implements IUserService {
    constructor(@Inject(IUSER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository) {}

    async createUser(dto: CreateUserReqDto): Promise<UserEntity> {
        const user = await this.userRepository.create(dto);

        return user;
    }

    async getUser(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneById(userId);

        if (!user) {
            throw new ResourceNotFoundException("user", userId);
        }

        return user;
    }
}
