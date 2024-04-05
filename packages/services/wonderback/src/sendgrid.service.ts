import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service.js';
import { Client } from '@sendgrid/client';
import sgMail = require('@sendgrid/mail');
import { UserWithoutPassword } from '@wonderland/domain';

@Injectable()
export class SendGridService {
    constructor(private readonly config: ConfigService) {
        sgMail.setClient(new Client());
        sgMail.setApiKey(this.config.config().sendGridApiKey);
    }

    async sendEmailToUser(params: {
        user: UserWithoutPassword;
        subject: string;
        template: { text: string; html: string };
    }) {
        try {
            const {
                user: { name, email },
                subject,
                template,
            } = params;
            await sgMail.send({
                from: 'Alexandru Antonescu <info@playlistool.com>',
                to: `${name} <${email}>`,
                subject,
                ...template,
            });
        } catch (error) {
            console.log(error);
        }
    }
}
