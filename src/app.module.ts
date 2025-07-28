import { configurations } from "@configs";
import { GlobalExceptionFilter } from "@filters";
import { ApplicationThrottlerGuard } from "@guards";
import { HttpLoggingInterceptor, RequestTimeoutInterceptor, TransformInterceptor } from "@interceptor";
import { ContextStoraggeModule } from "@modules/context-storage/context-storage.module";
import { DatabaseModule } from "@modules/database/database.module";
import { HealthModule } from "@modules/health/health.module";
import { LoggerModule } from "@modules/logger/infrastructure/nestjs/logger.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";
import { ValidationPipe } from "@pipes";
import { validationSchema } from "@utils";

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
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => [{ ttl: configService.get("THROTTLE_TTL", 60000), limit: configService.get("THROTTLE_LIMIT", 10) }]
        }),

        DatabaseModule,
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
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpLoggingInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestTimeoutInterceptor
        },
        {
            provide: APP_GUARD,
            useClass: ApplicationThrottlerGuard
        }
    ]
})
export class AppModule {}
