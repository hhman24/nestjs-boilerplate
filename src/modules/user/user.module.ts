import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity, UserSettingEntity } from "./entities";
import { IUSER_REPOSITORY_TOKEN, IUSER_SERVICE_TOKEN, IUSER_SETTING_REPOSITORY_TOKEN } from "./interfaces";
import { UserRepository, UserSettingRepository } from "./repositories";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserSettingEntity])],
    providers: [
        {
            provide: IUSER_REPOSITORY_TOKEN,
            useClass: UserRepository
        },
        {
            provide: IUSER_SETTING_REPOSITORY_TOKEN,
            useClass: UserSettingRepository
        },
        {
            provide: IUSER_SERVICE_TOKEN,
            useClass: UserService
        }
    ],
    exports: [IUSER_SERVICE_TOKEN]
})
export class UserModule {}
