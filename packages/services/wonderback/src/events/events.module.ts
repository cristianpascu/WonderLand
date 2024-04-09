import { Module } from '@nestjs/common';
import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';

@Module({
    controllers: [EventsController],
    exports: [EventsService],
    providers: [EventsService],
})
export class EventsModule {}
