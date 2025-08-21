import { ChainableCommander } from "ioredis";

export const REDIS_SERVICE_KEY = Symbol();

export interface IRedisService {
    set<T = any>(key: string, object: T | undefined | null, config?: { ttl?: number }): Promise<void>;
    get<T = any>(key: string, defaultValue?: T): Promise<T | undefined | null>;
    del(key: string): Promise<boolean>;

    addToSet(setKey: string, key: string): Promise<void>;
    getMememberSet(setKey: string): Promise<string[]>;

    hGet<T = any>(key: string, id: string, defaultValue?: T): Promise<T | undefined | null>;
    hSet<T = any>(key: string, id: string, object: T | undefined | null, ttlInSecond?: number): Promise<boolean>;

    hMGet<T = any>(key: string, ids: string[], defaultValue?: T): Promise<(T | null)[]>;
    hMSet<T extends Record<string, any>>(key: string, fields: T, ttlInSecond?: number): Promise<boolean>;
    hGetAll<T = any>(key: string, defaultValue?: T): Promise<T>;

    lPush<T = any>(key: string, object: T | undefined | null, ttlInSecond?: number): Promise<boolean>;
    lRem<T = any>(key: string, object: T | undefined | null): Promise<boolean>;

    incrBy(key: string, increment: number): Promise<number>;

    getLockKey(key: string): Promise<string>;
    acquirieLock(key: string, ttlInSecond: number): Promise<boolean>;
    unlock(key: string): Promise<boolean>;

    keys(pattern: string): Promise<string[]>;
    deleteKeysWithPrefix(prefix: string): Promise<number>;

    zScore(key: string, member: string): Promise<string>;

    pipeline(): ChainableCommander;

    __brand?: "IRedisService";
}
