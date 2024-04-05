import { Module } from '@nestjs/common';
import * as Redis from 'redis';

export const REDIS = Symbol('AUTH:REDIS');

@Module({
    providers: [
        {
            provide: REDIS,
            useFactory: async () => {
                const client = Redis.createClient({
                    url: process.env.REDIS_URL,
                });
                client.on('error', function (error) {
                    console.error('--------- REDIS CLIENT ---------');
                    console.error(error);
                    console.error('--------- REDIS CLIENT ---------');
                });
                await client.connect();
                return client;
            },
        },
    ],
    exports: [REDIS],
})
export class RedisModule {}
