import { Inject, Injectable } from '@nestjs/common';
import { REDIS } from './redis/redis.module.js';

import { RedisClientType as RedisClient } from 'redis';

type ICacheObject<V> = {
    value: V;
    ttl: number;
};

@Injectable()
export class CacheService {
    static readonly TEN_MINUTES = 10 * 60 * 1000;
    static readonly ONE_HOUR = 60 * 60 * 1000;
    static readonly ONE_DAY = 24 * CacheService.ONE_HOUR;
    static readonly ONE_WEEK = 7 * CacheService.ONE_DAY;
    static readonly ONE_MONTH = 30 * CacheService.ONE_DAY;
    static readonly NEVER = 1;

    static untilMidnight(): number {
        const now = new Date();
        const midnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
        );
        return midnight.getTime() - now.getTime();
    }

    constructor(@Inject(REDIS) private readonly redis: RedisClient) {}

    async fetch<V>(
        key: string,
        ttl: number,
        fetcher: () => Promise<V>,
    ): Promise<V> {
        const cachedValue = await this.get<V>(key);
        if (cachedValue) {
            return cachedValue;
        }
        const value = await fetcher();
        await this.set(key, value, ttl);
        return value;
    }

    async get<V>(key: string): Promise<V | null> {
        const storedValue = await this.redis.get(key);
        if (!storedValue) {
            return null;
        }
        const value: ICacheObject<V> = JSON.parse(storedValue);
        const now = new Date().getTime();
        if (value.ttl > now) {
            console.log('Cache hit' + key);
            return value.value;
        } else {
            await this.redis.del(key);
            return null;
        }
    }

    async set<V>(key: string, value: V, ttl: number) {
        const now = new Date().getTime();
        const cacheObject: ICacheObject<V> = {
            value,
            ttl: now + ttl,
        };
        await this.redis.set(key, JSON.stringify(cacheObject));
    }

    async clear(key: string) {
        await this.redis.del(key);
    }
}
