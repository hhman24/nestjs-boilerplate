import { validationSchema } from "@common/validations";
import { configurations } from "@config";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from './modules/logger/logger.module';

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
        LoggerModule
    ]
})
export class AppModule {}
