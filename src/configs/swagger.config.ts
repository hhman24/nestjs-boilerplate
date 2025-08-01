import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication): void => {
    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle("Nestjs boiplerplate API")
        .setDescription("Nestjs boiplerplate API description")
        .setVersion(configService.get("VERSION"))
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            },
            "access-token"
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            spec: undefined
        },
        customJs: [`/docs/swagger-ui-init.js?v=${Date.now()}`]
    });
};
