import * as path from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { validateEnv } from "./common/config/env.validation";
import type { Env } from "./common/config/env.validation";
import { buildTypeOrmOptions } from "./database/typeorm-options";
import { RedisModule } from "./redis/redis.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      // Single root .env for the whole monorepo (see .env.example) — not
      // apps/api's own cwd, which is what @nestjs/config defaults to.
      envFilePath: path.resolve(__dirname, "..", "..", "..", ".env"),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) =>
        buildTypeOrmOptions({
          host: configService.get("DB_HOST", { infer: true }),
          port: configService.get("DB_PORT", { infer: true }),
          username: configService.get("DB_USERNAME", { infer: true }),
          password: configService.get("DB_PASSWORD", { infer: true }),
          database: configService.get("DB_DATABASE", { infer: true }),
        }),
    }),
    RedisModule,
    HealthModule,
  ],
})
export class AppModule {}
