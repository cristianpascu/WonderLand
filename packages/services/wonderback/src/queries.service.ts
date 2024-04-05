import { Injectable } from '@nestjs/common';
import { PrismaClient, UserQueries } from '@wonderland/domain';
import { ConfigService } from './config.service.js';

@Injectable()
export class QueryService {
    private client: PrismaClient;

    private queries: {
        users: UserQueries;
    };

    constructor(private readonly configService: ConfigService) {
        const { databaseURL: datasourceUrl } = configService.config();
        this.client = new PrismaClient({
            datasourceUrl,
        });
        this.queries = {
            users: UserQueries.create(this.client),
        };
    }

    public get users(): UserQueries {
        return this.queries.users;
    }
}
