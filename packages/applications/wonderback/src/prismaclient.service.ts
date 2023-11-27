import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from './config.service';

@Injectable()
export class PrismaClientService {
    private client: PrismaClient;

    constructor(private readonly configService: ConfigService) {
        const { databaseURL: datasourceUrl } = configService.config();
        this.client = new PrismaClient({
            datasourceUrl,
        });
    }

    public db(): PrismaClient {
        return this.client;
    }
}
