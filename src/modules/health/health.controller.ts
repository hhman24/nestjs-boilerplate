import { ILoggerService, LOGGER_KEY } from "@modules/logger/domain";
import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DiskHealthIndicator, HealthCheck, HealthCheckService, MemoryHealthIndicator } from "@nestjs/terminus";
import path from "path";
import { Public } from "src/decorators";

@Controller("health")
@ApiTags("Health Check")
export class HealthController {
    constructor(
        @Inject(LOGGER_KEY)
        private readonly logger: ILoggerService,
        private health: HealthCheckService,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator
    ) {}

    @Public()
    @ApiOperation({ summary: "Health check" })
    @Get()
    @HealthCheck()
    async check() {
        return {
            data: await this.health.check([
                /* istanbul ignore next */
                // () => this.db.pingCheck("database", { timeout: 300 }),
                /* istanbul ignore next */
                () => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024),
                /* istanbul ignore next */
                () => this.memory.checkRSS("memory_rss", 150 * 1024 * 1024),
                /* istanbul ignore next */
                () => this.disk.checkStorage("storage", { thresholdPercent: 0.8, path: path.parse(process.cwd()).root })
            ])
        };
    }
}
