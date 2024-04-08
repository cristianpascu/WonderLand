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
                from: 'Cristian Pascu <cristian@wonderland.com>',
                to: `${name} <${email}>`,
                subject,
                ...template,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async sendResetPasswordEmail(params: {
        user: UserWithoutPassword;
        link: string;
    }) {
        const { user, link } = params;

        const template = `Hello, ${user.name},
                
                You have requested to reset your password. 

                Do so by clicking on this link: <a href="${link}">Reset Password</a>.

                If you haven't requested a password reset, you can safely ignore this email.

                Regards,
                Playlistool Team
            `;

        this.sendEmailToUser({
            user,
            subject: `Reset your password`,
            template: {
                text: template,
                html: template.replace(/\n/gi, '<br/>'),
            },
        });
    }
}
