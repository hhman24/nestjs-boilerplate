import { ResourceNotFoundException } from "@exceptions";
import { Inject, Injectable } from "@nestjs/common";
import { CreateUserReqDto, CreateUserSettingDto } from "./dtos";
import { UserEntity } from "./entities";
import { IUSER_REPOSITORY_TOKEN, IUSER_SETTING_REPOSITORY_TOKEN, IUserRepository, IUserService, IUserSettingRepository } from "./interfaces";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(IUSER_REPOSITORY_TOKEN) private readonly userRepository: IUserRepository,
        @Inject(IUSER_SETTING_REPOSITORY_TOKEN) private readonly userSettingRepository: IUserSettingRepository
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
