import "reflect-metadata";
import * as path from "node:path";
import { config as loadEnv } from "dotenv";
import { DataSource } from "typeorm";
import { buildTypeOrmOptions } from "./typeorm-options";

/**
 * Standalone DataSource for the TypeORM CLI (migration:generate/run/revert)
 * and the seed script (seed/seed.ts) — deliberately outside Nest's DI
 * container so these can run without booting the full HTTP app. Unlike the
 * running server (which gets env vars via @nestjs/config), these CLI
 * entrypoints load .env directly since nothing else bootstraps them.
 */
loadEnv({ path: path.resolve(__dirname, "..", "..", "..", "..", ".env") });

const required = ["DB_HOST", "DB_USERNAME", "DB_PASSWORD", "DB_DATABASE"] as const;
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`${key} is not set — copy .env.example to .env and fill it in.`);
  }
}

export const AppDataSource = new DataSource(
  buildTypeOrmOptions({
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
  }),
);
