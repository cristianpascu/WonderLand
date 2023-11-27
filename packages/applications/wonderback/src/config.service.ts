import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

type IConfig = {
    databaseURL?: string;
};

@Injectable()
export class ConfigService {
    private configuration: IConfig;

    constructor() {
        config();
        const { DATABASE_URL: databaseURL } = process.env;
        this.configuration = {
            databaseURL,
        };
    }

    public config(): IConfig {
        return this.configuration;
    }
}
