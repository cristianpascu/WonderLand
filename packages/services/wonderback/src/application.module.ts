import { join } from 'path';

import { Inject, MiddlewareConsumer, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';

import { RedisClientType as RedisClient } from 'redis';

import RedisStore from 'connect-redis';
import session from 'express-session';
import passport from 'passport';

import { ApplicationController } from './application.controller.js';
import { ApplicationService } from './application.service.js';
import { ConfigService, InProductionLikeABoss } from './config.service.js';
import { QueryService } from './queries.service.js';
import { AccountsModule } from './accounts/accounts.module.js';
import { AuthenticationModule } from './authentication/auth.module.js';
import { REDIS, RedisModule } from './redis/redis.module.js';
import { CacheService } from './cache.service.js';

import { AuthenticatedGuard } from './authentication/auth.guard.js';
import { SendGridService } from './sendgrid.service.js';
import { OpenAiModule } from './openai/openai.module.js';

const ProductionModules = [];
if (InProductionLikeABoss) {
    const __dirname = new URL('.', import.meta.url).pathname;
    ProductionModules.push(
        ServeStaticModule.forRoot({
            rootPath: join(
                __dirname,
                '..',
                '..',
                '..',
                'clients',
                'trading',
                'dist',
            ),
            exclude: ['/api/(.*)'],
        }),
    );
}
@Module({
    imports: [
        AuthenticationModule,
        AccountsModule,
        ScheduleModule.forRoot(),
        RedisModule,
        OpenAiModule,
    ].concat(ProductionModules),
    controllers: [ApplicationController],
    providers: [
        ApplicationService,
        ConfigService,
        QueryService,
        CacheService,
        SendGridService,
        {
            provide: APP_GUARD,
            useClass: AuthenticatedGuard,
        },
    ],
})
export class ApplicationModule {
    constructor(@Inject(REDIS) private readonly redis: RedisClient) {}

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                session({
                    store: new RedisStore({
                        client: this.redis,
                    }),
                    secret: process.env.PASSPORT_SESSION_KEY as string,
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        sameSite: !InProductionLikeABoss,
                        httpOnly: false,
                        maxAge: 24 * 60 * 60000,
                    },
                }),
                passport.initialize(),
                passport.session(),
            )
            .forRoutes('*');
    }
}
