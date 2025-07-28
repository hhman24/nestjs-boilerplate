import { IDatabaseConfig } from "@common";
import { ConfigKeyEnum } from "@enums";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configSerice: ConfigService) => {
                const mysqlConfig = configSerice.get<IDatabaseConfig>(`${ConfigKeyEnum.MY_SQL}`);

                if (!mysqlConfig) {
                    throw new Error("MySQL config not found in ConfigService");
                }

                return mysqlConfig;
            }
        })
    ]
})
export class DatabaseModule {}
