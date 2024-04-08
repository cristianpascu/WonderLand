import { Module } from '@nestjs/common';
import { ConfigService } from '../config.service.js';
import { QueryService } from '../queries.service.js';
import { AuthenticationController } from './auth.controller.js';
import { AuthenticationService } from './auth.service.js';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy.js';
import { SessionSerializer } from './session.serializer.js';
import { SendGridService } from '../sendgrid.service.js';

@Module({
    imports: [PassportModule.register({ session: true })],
    controllers: [AuthenticationController],
    exports: [AuthenticationService],
    providers: [
        AuthenticationService,
        ConfigService,
        QueryService,
        SendGridService,
        LocalStrategy,
        SessionSerializer,
    ],
})
export class AuthenticationModule {}
