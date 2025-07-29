import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities";
import { IUSER_REPOSITORY_TOKEN, IUSER_SERVICE_TOKEN } from "./interfaces";
import { UserRepository } from "./repositories";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: IUSER_REPOSITORY_TOKEN,
            useClass: UserRepository
        },
        {
            provide: IUSER_SERVICE_TOKEN,
            useClass: UserService
        }
    ],
    exports: [IUSER_SERVICE_TOKEN]
})
export class UserModule {}
