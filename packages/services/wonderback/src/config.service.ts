import { Injectable } from '@nestjs/common';

export const InProductionLikeABoss = process.env.NODE_ENV == 'production';
export const InProductionLikeACTO =
    process.env.NODE_ENV == 'production' && process.env.NODE_MODE == 'local';

type IConfig = {
    databaseURL: string;

    sendGridApiKey: string;
    openAiApiKey: string;
};

@Injectable()
export class ConfigService {
    private configuration: IConfig;

    constructor() {
        const {
            DATABASE_URL: databaseURL,
            SENDGRID_API_KEY: sendGridApiKey,
            OPENAI_API_KEY: openAiApiKey,
        } = process.env;

        if (!(databaseURL && sendGridApiKey && openAiApiKey))
            throw new Error('Some of the configuration variables are not set');

        this.configuration = {
            databaseURL,
            sendGridApiKey,
            openAiApiKey,
        };
    }

    public config(): IConfig {
        return this.configuration;
    }
}
