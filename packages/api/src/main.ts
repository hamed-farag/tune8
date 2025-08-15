import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";

import { AppModule } from "./app.module";

// Load environment variables from root .env file
dotenv.config({ path: "../.env" });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS for frontend
  app.enableCors({
    origin: configService.get("cors.frontendUrl"),
    credentials: true,
  });

  // Set global API prefix
  const apiPrefix = configService.get("api.prefix");
  app.setGlobalPrefix(apiPrefix);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle("Tune8 API")
    .setDescription("The Tune8 API description")
    .setVersion("1.0")
    .addTag("tune8")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiPrefix, app, document);

  const port = configService.get("port");
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/${apiPrefix}`);
}
bootstrap();
