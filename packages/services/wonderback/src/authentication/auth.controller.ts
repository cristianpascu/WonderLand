import { AuthenticationService } from './auth.service.js';

import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { Public } from './public.js';
import { LocalAuthGuard } from './auth.guard.js';
import { Request } from '../model.js';
import {
    AuthenticationRoutes,
    AuthenticationSignUpRequest,
    AuthenticationSignUpResponse,
    AuthenticationSignInRequest,
    AuthenticationSignInResponse,
    AuthenticationForgotPasswordRequest,
    AuthenticationForgotPasswordResponse,
    AuthenticationResetPasswordRequest,
    AuthenticationResetPasswordResponse,
} from '@wonderland/common';
import { SendGridService } from '../sendgrid.service.js';

@Controller(AuthenticationRoutes.$)
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly sendgrid: SendGridService,
    ) {}

    @Post(AuthenticationRoutes.SignIn)
    @Public()
    @UseGuards(LocalAuthGuard)
    async SignIn(
        @Req() req: Request<AuthenticationSignInRequest>,
    ): Promise<AuthenticationSignInResponse> {
        const { user } = req;
        if (!user) {
            return;
        }
        const data =
            await this.authenticationService.getInitializationData(user);
        return data;
    }

    @Public()
    @Post(AuthenticationRoutes.SignUp)
    async SignUp(
        @Req()
        req: Request<AuthenticationSignUpRequest>,
    ): Promise<AuthenticationSignUpResponse> {
        const { email, password, name } = req.body;
        return await this.authenticationService.createUser({
            email,
            password,
            name,
        });
    }

    @Post(AuthenticationRoutes.SignOut)
    async SignOut(@Req() request: Request) {
        await request.session.destroy(() => {});
        return { success: true };
    }

    @Public()
    @Post(AuthenticationRoutes.ForgotPassword)
    async ForgotPassword(
        @Req() req: Request<AuthenticationForgotPasswordRequest>,
    ): Promise<AuthenticationForgotPasswordResponse> {
        const { email } = req.body;
        const result =
            await this.authenticationService.sendResetPasswordEmail(email);
        return result;
    }

    @Public()
    @Post(AuthenticationRoutes.ResetPassword)
    async ResetPassword(
        @Req() req: Request<AuthenticationResetPasswordRequest>,
    ): Promise<AuthenticationResetPasswordResponse> {
        const { email, password, link } = req.body;
        const result = await this.authenticationService.resetPassword(
            email,
            password,
            link,
        );
        return result;
    }
}
