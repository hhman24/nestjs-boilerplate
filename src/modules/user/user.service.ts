import { ResourceNotFoundException } from "@exceptions";
import { Inject, Injectable } from "@nestjs/common";
import { CreateUserReqDto, CreateUserSettingDto } from "./dtos";
import { UserEntity } from "./entities";
import { IUserRepository, IUserService, IUserSettingRepository, USER_REPOSITORY_TOKEN, USER_SETTING_REPOSITORY_TOKEN } from "./interfaces";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository,
        @Inject(USER_SETTING_REPOSITORY_TOKEN) private readonly userSettingRepository: IUserSettingRepository
    ) {}

    async createUser(dto: CreateUserReqDto): Promise<UserEntity> {
        const user = await this.userRepository.create(dto);

        this.createUserSetting(user.id, { isEmailVerified: false, isPhoneVerified: false });

        return user;
    }

    async getUser(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneById(userId);

        if (!user) {
            throw new ResourceNotFoundException("user", userId);
        }

        return user;
    }

    async createUserSetting(userId: Uuid, dto: CreateUserSettingDto) {
        await this.userSettingRepository.create({ userId, ...dto });
    }
}
