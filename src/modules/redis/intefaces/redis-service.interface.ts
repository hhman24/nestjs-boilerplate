export const REDIS_SERVICE_KEY = Symbol();

export interface IRedisService {
    set<T = any>(key: string, object: T | undefined | null, config?: { ttl?: number }): Promise<void>;
    __brand?: "IRedisService";
}
