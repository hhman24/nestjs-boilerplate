import { ConfigKey, Environment } from "@common/enums";
import { AppConfig } from "@common/interfaces";
import { Logger, RequestMethod, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const appConfig = configService.get<AppConfig>(`${ConfigKey.APP}`);

    // clean up
    app.enableShutdownHooks();

    app.setGlobalPrefix(appConfig.apiPrefix, {
        exclude: [{ path: "/health", method: RequestMethod.GET }]
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    app.enableCors({
        origin: appConfig.origins,
        credentials: appConfig.nodeEnv === Environment.PRODUCTION ? true : false,
        methods: ["GET", "POST", "DELETE", "PATCH", "PUT"]
    });

    // setup helmet and cookie parser

    // start app
    await app.listen(appConfig.port!, "0.0.0.0");
    Logger.log(`${appConfig.serviceName} is running on: ${await app.getUrl()}`);
}
bootstrap();
