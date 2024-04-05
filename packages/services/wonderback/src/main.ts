import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './application.module.js';
import {
    InProductionLikeABoss,
    InProductionLikeACTO,
} from './config.service.js';
import { config } from 'dotenv';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const path = join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    InProductionLikeABoss ? '.env.production' : '.env.dev',
);

if (!InProductionLikeACTO) {
    config({
        path,
    });

    console.log('LOADED ENV FILE:', path);
}

async function bootstrap() {
    const application = await NestFactory.create(ApplicationModule);
    application.enableCors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    });
    InProductionLikeABoss && application.setGlobalPrefix('api');
    await application.listen(
        InProductionLikeABoss ? process.env.PORT || 80 : 3001,
    );
}
bootstrap();
