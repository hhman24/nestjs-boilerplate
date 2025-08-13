import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { IRedisService, REDIS_CLIENT_KEY } from "./intefaces";

@Injectable()
export class RedisService implements IRedisService {
    constructor(@Inject(REDIS_CLIENT_KEY) private readonly redisClient: Redis) {}

    async set<T = any>(key: string, object: T | undefined | null, config?: { ttl?: number }) {
        if (config?.ttl) {
            await this.redisClient.set(key, JSON.stringify(object), "EX", config.ttl);
        } else {
            await this.redisClient.set(key, JSON.stringify(object));
        }
    }

    async get<T = any>(key: string, defaultValue?: T): Promise<T | undefined | null> {
        const data = await this.redisClient.get(key);
        return data ? (JSON.parse(data) as T) : defaultValue;
    }

    async del(key: string): Promise<boolean> {
        const res = await this.redisClient.del(key);
        return res == 1;
    }
}
