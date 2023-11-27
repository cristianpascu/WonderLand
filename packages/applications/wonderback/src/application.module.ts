import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ConfigService } from './config.service';
import { PrismaClientService } from './prismaclient.service';

@Module({
    imports: [],
    controllers: [ApplicationController],
    providers: [ApplicationService, ConfigService, PrismaClientService],
})
export class ApplicationModule {}
