import { Controller, Get, Put, Req } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { User } from '@prisma/client';
import { Request } from 'express';

@Controller()
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Get()
    getHello(): string {
        return this.applicationService.getHello();
    }

    @Get('/users')
    async listUsers(): Promise<User[]> {
        try {
            return await this.applicationService.listUsers();
        } catch (error) {
            throw error;
        }
    }

    @Put('/user')
    async createUser(@Req() req: Request): Promise<User> {
        try {
            return await this.applicationService.createUser(req.body);
        } catch (error) {
            throw error;
        }
    }
}
