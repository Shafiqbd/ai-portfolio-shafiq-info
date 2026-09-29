import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import type { Env } from "../common/config/env.validation";

/**
 * Thin ioredis wrapper — the single Redis connection reused everywhere a
 * later milestone needs it (response caching in B3, throttler storage in
 * B5/B6). Kept deliberately minimal: no session store, no pub/sub, per the
 * Phase 9 plan's "two bounded, justified uses only" scope.
 */
@Injectable()
export class RedisService implements OnModuleDestroy {
  readonly client: Redis;

  constructor(configService: ConfigService<Env, true>) {
    this.client = new Redis(configService.get("REDIS_URL", { infer: true }), {
      lazyConnect: false,
    });
  }

  async ping(): Promise<boolean> {
    try {
      const reply = await this.client.ping();
      return reply === "PONG";
    } catch {
      return false;
    }
  }

  onModuleDestroy() {
    this.client.disconnect();
  }
}
