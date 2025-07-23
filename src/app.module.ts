import { validationSchema } from "@common/validations";
import { configurations } from "@config";
import { LoggerModule } from "@modules/logger";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: validationSchema,
            validationOptions: {
                abortEarly: false
            },
            cache: true,
            envFilePath: process.env.NODE_ENV === "development" ? "env.local" : ".env",
            load: [...configurations]
        }),
        LoggerModule.forRootAsync({
            engine: "winston",
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    level: configService.get("LOG_LEVEL"),
                    logDir: configService.get("LOG_DIR"),
                    serviceName: configService.get("SERVICE_NAME")
                };
            },
            inject: [ConfigService]
        })
    ]
})
export class AppModule {}
