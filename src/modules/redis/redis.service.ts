import { Inject, Injectable } from "@nestjs/common";
import Redis, { ChainableCommander } from "ioredis";
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

    async addToSet(setKey: string, key: string): Promise<void> {
        await this.redisClient.sadd(setKey, key);
    }

    async getMememberSet(setKey: string): Promise<string[]> {
        return this.redisClient.smembers(setKey);
    }

    async hGet<T = any>(key: string, id: string, defaultValue?: T): Promise<T | undefined | null> {
        const data = await this.redisClient.hget(key, id);
        return data ? (JSON.parse(data) as T) : defaultValue;
    }

    async hSet<T = any>(key: string, id: string, object: T | undefined | null, ttlInSecond?: number): Promise<boolean> {
        let success = true;
        const chain = this.redisClient.multi().hset(key, id, JSON.stringify(object));

        if (ttlInSecond) {
            chain.expire(key, ttlInSecond);
        }

        await chain.exec().catch((err) => {
            success = false;
            console.log("hSet error", err);
        });

        return success;
    }

    async hMGet<T = any>(key: string, ids: string[], defaultValue?: T): Promise<(T | null)[]> {
        try {
            const results = await this.redisClient.hmget(key, ...ids);

            return results.map((data) => (data ? (JSON.parse(data) as T) : null));
        } catch (error) {
            console.error(`Redis hmget error on key: ${key}, ids: ${ids.join(",")}`, error);
            return ids.map(() => defaultValue ?? null);
        }
    }

    async hMSet<T extends Record<string, any>>(key: string, fields: T, ttlInSecond?: number): Promise<boolean> {
        if (!fields || Object.keys(fields).length === 0) {
            console.warn(`hSetMany skipped: no fields provided for key: ${key}`);
            return false;
        }

        try {
            // Flatten the object to [field1, value1, field2, value2, ...]
            const args: (string | Buffer)[] = [];
            for (const [field, value] of Object.entries(fields)) {
                args.push(field, typeof value === "string" ? value : JSON.stringify(value));
            }

            const pipeline = this.redisClient.multi().hset(key, ...args);

            if (ttlInSecond) {
                pipeline.expire(key, ttlInSecond);
            }

            await pipeline.exec();
            return true;
        } catch (err) {
            console.error(`Redis hSetMany error on key: ${key}`, err);
            return false;
        }
    }

    async hGetAll<T = any>(key: string, defaultValue?: T): Promise<T> {
        try {
            const result = await this.redisClient.hgetall(key);

            // If Redis key doesn't exist or is empty, return defaultValue or empty object
            if (!result || Object.keys(result).length === 0) {
                return defaultValue ?? ({} as T);
            }

            return result as T;
        } catch (error) {
            console.error(`Redis hgetall error on key: ${key}`, error);
            return defaultValue;
        }
    }

    async lPush<T = any>(key: string, object: T | undefined | null, ttlInSecond?: number): Promise<boolean> {
        let success = true;
        const chain = this.redisClient.multi().lpush(key, JSON.stringify(object));

        if (ttlInSecond) {
            chain.expire(key, ttlInSecond);
        }

        await chain.exec().catch((err) => {
            success = false;
            console.log("lPush error", err);
        });

        return success;
    }

    async lRange<T = any>(key: string, start: number, end: number): Promise<T[]> {
        const data = await this.redisClient.lrange(key, start, end);
        return data.map((v) => JSON.parse(v));
    }

    async lRem<T = any>(key: string, object: T | undefined | null): Promise<boolean> {
        let success = true;
        await this.redisClient
            .multi()
            .lrem(key, 0, JSON.stringify(object))
            .exec()
            .catch((err) => {
                success = false;
                console.log("lRem error", err);
            });

        return success;
    }

    async incrBy(key: string, increment: number): Promise<number> {
        return this.redisClient.incrby(key, increment);
    }

    async getLockKey(key: string): Promise<string> {
        return `locked:${key}`;
    }

    async acquirieLock(key: string, ttlInSecond: number): Promise<boolean> {
        const lockKey = await this.getLockKey(key);

        const results = await this.redisClient.multi().setnx(lockKey, lockKey).expire(lockKey, ttlInSecond).exec();
        const success = results?.[0]?.[1] === 1;

        return success;
    }

    async unlock(key: string): Promise<boolean> {
        const lockKey = await this.getLockKey(key);
        const res = await this.redisClient.del(lockKey);

        if (res == 1) {
            return true;
        }

        return false;
    }

    async keys(pattern: string): Promise<string[]> {
        return this.redisClient.keys(pattern);
    }

    pipeline(): ChainableCommander {
        return this.redisClient.pipeline();
    }

    async zScore(key: string, member: string): Promise<string> {
        return this.redisClient.zscore(key, member);
    }

    async deleteKeysWithPrefix(prefix: string): Promise<number> {
        const pattern = `${prefix}*`;
        const keys = await this.redisClient.keys(pattern);
        if (keys.length > 0) {
            await this.redisClient.del(...keys);
        }

        return keys.length;
    }
}
