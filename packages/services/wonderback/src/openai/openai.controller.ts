import { Controller, Post, Req } from '@nestjs/common';
import { OpenAIService } from './openai.service.js';
import { Request } from '../model.js';
import { OpenAIAskRequest, OpenAIAskResponse } from '@wonderland/common';

@Controller('openai')
export class OpenAIController {
    constructor(private readonly openAI: OpenAIService) {}

    @Post('ask')
    async Ask(
        @Req() request: Request<OpenAIAskRequest>,
    ): Promise<OpenAIAskResponse> {
        const {
            body: { prompt },
        } = request;

        const response = await this.openAI.ask(prompt);

        return {
            response,
        };
    }
}
