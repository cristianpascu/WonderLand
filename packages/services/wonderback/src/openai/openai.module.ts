import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.service.js';
import { OpenAIController } from './openai.controller.js';

@Module({
    exports: [OpenAIService],
    controllers: [OpenAIController],
    providers: [OpenAIService],
})
export class OpenAiModule {}
