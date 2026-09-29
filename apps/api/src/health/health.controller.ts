import { Controller, Get, ServiceUnavailableException, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import { InjectDataSource } from "@nestjs/typeorm";
import type { DataSource } from "typeorm";
import { RedisService } from "../redis/redis.service";

interface HealthResponse {
  status: "ok" | "degraded";
  db: boolean;
  redis: boolean;
}

@ApiExcludeController()
@Controller({ path: "health", version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async check(): Promise<HealthResponse> {
    const [db, redis] = await Promise.all([this.checkDb(), this.redisService.ping()]);
    const status = db && redis ? "ok" : "degraded";
    const body: HealthResponse = { status, db, redis };

    if (status === "degraded") {
      throw new ServiceUnavailableException(body);
    }
    return body;
  }

  private async checkDb(): Promise<boolean> {
    try {
      await this.dataSource.query("SELECT 1");
      return true;
    } catch {
      return false;
    }
  }
}
