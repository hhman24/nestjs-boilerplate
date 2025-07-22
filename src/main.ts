import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // start app
    await app.listen(configService.get("PORT")!, "0.0.0.0");
    console.log(`${configService.get("SERVICE_NAME")} is running on: ${await app.getUrl()}`);
}
bootstrap();
