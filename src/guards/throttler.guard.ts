import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard, ThrottlerRequest } from "@nestjs/throttler";

@Injectable()
export class ApplicationThrottlerGuard extends ThrottlerGuard {
    protected async getTracker(req: Record<string, any>): Promise<string> {
        return req.ips?.length ? req.ips[0] : req.ip || req.headers["x-forwarded-for"] || req.connection?.remoteAddress; // individualize IP extraction to meet your own needs
    }

    protected getRequest(context: ExecutionContext): any {
        return context.switchToHttp().getRequest();
    }

    async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
        const { context, limit, ttl, throttler } = requestProps;
        const request = this.getRequest(context);

        const ip = await this.getTracker(request);
        const key = this.generateKey(context, ip, throttler.name!);
        const { totalHits } = await this.storageService.increment(key, ttl, limit, Number(throttler.blockDuration) || 10000, throttler.name!);

        if (totalHits > limit) {
            throw new ThrottlerException(`${ip} too many requests`);
        }

        return true;
    }
}
