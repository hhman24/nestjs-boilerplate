import { GlobalExceptionFilter } from "@common/exceptions/global-exception.filter";
import { ValidationPipe } from "@common/pipes";
import { validationSchema } from "@common/validations";
import { configurations } from "@config";
import { ContextStoraggeModule } from "@modules/context-storage/context-storage.module";
import { HealthModule } from "@modules/health/health.module";
import { LoggerModule } from "@modules/logger/infrastructure/nestjs/logger.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";

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
        LoggerModule,
        ContextStoraggeModule,
        HealthModule
    ],

    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter
        }
    ]
})
export class AppModule {}
