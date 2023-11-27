import { Injectable } from '@nestjs/common';
import { PrismaClientService } from './prismaclient.service';
import { User } from '@prisma/client';

@Injectable()
export class ApplicationService {
    constructor(private readonly client: PrismaClientService) {}

    getHello(): string {
        return 'Hello World!';
    }

    async listUsers() {
        try {
            const users = await this.client.db().user.findMany();
            return users;
        } catch (error) {
            throw error;
        }
    }

    async createUser(data: User) {
        try {
            const user = await this.client.db().user.create({
                data,
            });
            return user;
        } catch (error) {
            throw error;
        }
    }
}
