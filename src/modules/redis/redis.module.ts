import { DynamicModule, Module, Provider } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS_CLIENT_KEY, REDIS_SERVICE_KEY, RedisAsyncModuleOptions } from "./intefaces";

@Module({})
export class RedisModule {
    static async registerAsync(options: RedisAsyncModuleOptions): Promise<DynamicModule> {
        const redisProvider: Provider = {
            provide: REDIS_CLIENT_KEY,
            useFactory: async (...args) => {
                const { connectionOptions, onClientReady } = await options.useFactory(...args);

                const client = new Redis(connectionOptions);

                onClientReady(client);

                return client;
            },
            inject: options.inject
        };

        return {
            module: RedisModule,
            imports: [...options.imports],
            providers: [redisProvider],
            exports: [REDIS_SERVICE_KEY]
        };
    }
}
