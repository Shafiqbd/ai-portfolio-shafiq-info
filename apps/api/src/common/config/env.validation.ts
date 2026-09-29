import { z } from "zod";

/**
 * Validated once at boot via ConfigModule.forRoot({ validate }). Fails fast
 * with a clear message instead of the app starting in a half-configured
 * state and failing confusingly later (e.g. on the first DB query).
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  // Discrete Postgres fields (not a single DATABASE_URL) so passwords with
  // reserved URL characters (&, %, etc.) don't need percent-encoding.
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  REDIS_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    throw new Error(`Invalid environment configuration:\n${z.prettifyError(parsed.error)}`);
  }
  return parsed.data;
}
