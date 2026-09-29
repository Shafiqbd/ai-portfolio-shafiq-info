import type { DataSourceOptions } from "typeorm";
import * as path from "node:path";

/**
 * Shared between the Nest-managed connection (app.module.ts, via
 * TypeOrmModule.forRootAsync) and the standalone CLI DataSource
 * (data-source.ts, used by migration:generate/run and unaffected by Nest's
 * DI container). Keeping this in one place means the two never drift.
 *
 * synchronize is always false, including local dev — schema changes go
 * through reviewed migrations from day one (see the Phase 9 plan).
 */
export interface DbConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export function buildTypeOrmOptions(db: DbConnectionConfig): DataSourceOptions {
  return {
    type: "postgres",
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    synchronize: false,
    entities: [path.join(__dirname, "..", "**", "*.entity.{ts,js}")],
    migrations: [path.join(__dirname, "migrations", "*.{ts,js}")],
  };
}
