import { validationSchema } from "@common/validations";
import { configurations } from "@config";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

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
        })
    ]
})
export class AppModule {}
