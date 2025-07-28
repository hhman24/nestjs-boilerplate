import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities";
import { IUSER_REPOSITORY_TOKEN } from "./interfaces";
import { UserRepository } from "./repositories";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: IUSER_REPOSITORY_TOKEN,
            useClass: UserRepository
        }
    ],
    exports: []
})
export class UserModule {}
