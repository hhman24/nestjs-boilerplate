import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity, UserSettingEntity } from "./entities";
import { USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN, USER_SETTING_REPOSITORY_TOKEN } from "./interfaces";
import { UserRepository, UserSettingRepository } from "./repositories";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserSettingEntity])],
    providers: [
        {
            provide: USER_REPOSITORY_TOKEN,
            useClass: UserRepository
        },
        {
            provide: USER_SETTING_REPOSITORY_TOKEN,
            useClass: UserSettingRepository
        },
        {
            provide: USER_SERVICE_TOKEN,
            useClass: UserService
        }
    ],
    exports: [USER_SERVICE_TOKEN]
})
export class UserModule {}
