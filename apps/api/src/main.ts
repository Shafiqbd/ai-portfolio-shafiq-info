import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import type { Env } from "./common/config/env.validation";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Env, true>);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // URI versioning (/v1/...) — health check opts out via VERSION_NEUTRAL
  // since infra probes shouldn't need to track API version bumps.
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle("Shafiq Info API")
      .setDescription("Backend for shafiq.info.bd — profile, projects, case studies, contact, Ask Shafiq AI.")
      .setVersion("1.0")
      .build(),
  );
  SwaggerModule.setup("docs", app, swaggerDocument);

  const port = configService.get("PORT", { infer: true });
  await app.listen(port);
  console.log(`[api] listening on http://localhost:${port}`);
  console.log(`[api] swagger docs at http://localhost:${port}/docs`);
}

void bootstrap();
