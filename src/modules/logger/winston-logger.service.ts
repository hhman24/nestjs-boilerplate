import { Inject, Injectable, LoggerService as NestLoggerService } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class WinstonLoggerService implements NestLoggerService {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    log(message: any, context: string) {
        this.logger.info(message, { context });
    }

    error(message: any, context: string, trace?: string) {
        this.logger.error(message, { context, trace });
    }

    warn(message: any, context: string) {
        this.logger.warning(message, { context });
    }

    debug(message: any, context: string) {
        this.logger.debug(message, { context });
    }

    verbose(message: any, context: string) {
        this.logger.notice?.(message, { context });
    }
}
