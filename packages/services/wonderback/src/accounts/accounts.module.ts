import { Module } from '@nestjs/common';
import { ConfigService } from '../config.service.js';
import { QueryService } from '../queries.service.js';
import { AccountsController } from './accounts.controller.js';
import { AccountsService } from './accounts.service.js';

@Module({
    imports: [],
    controllers: [AccountsController],
    providers: [AccountsService, ConfigService, QueryService],
})
export class AccountsModule {}
