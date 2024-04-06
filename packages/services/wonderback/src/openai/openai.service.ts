import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI();
    }

    async ask(prompt: string): Promise<string> {
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: 'system', content: prompt }],
            model: 'gpt-3.5-turbo',
        });

        const { choices } = completion;
        const [
            {
                message: { content },
            },
        ] = choices;

        return content || '';
    }
}
