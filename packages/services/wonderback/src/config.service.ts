import { Injectable } from '@nestjs/common';

export const InProductionLikeABoss = process.env.NODE_ENV == 'production';
export const InProductionLikeACTO =
    process.env.NODE_ENV == 'production' && process.env.NODE_MODE == 'local';

type IConfig = {
    databaseURL: string;

    spotifyClientId: string;
    spotifyClientSecret: string;

    sendGridApiKey: string;
};

@Injectable()
export class ConfigService {
    private configuration: IConfig;

    constructor() {
        const {
            DATABASE_URL: databaseURL,
            SPOTIFY_CLIENT_ID: spotifyClientId,
            SPOTIFY_CLIENT_SECRET: spotifyClientSecret,
            SENDGRID_API_KEY: sendGridApiKey,
        } = process.env;

        if (
            !(
                databaseURL &&
                spotifyClientId &&
                spotifyClientSecret &&
                sendGridApiKey
            )
        )
            throw new Error('Some of the configuration variables are not set');

        this.configuration = {
            databaseURL,
            spotifyClientId,
            spotifyClientSecret,
            sendGridApiKey,
        };
    }

    public config(): IConfig {
        return this.configuration;
    }
}
