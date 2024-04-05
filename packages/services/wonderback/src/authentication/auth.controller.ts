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
} from '@wonderland/common';

@Controller(AuthenticationRoutes.$)
export class AuthenticationController {
    constructor(private readonly client: AuthenticationService) {}

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
        const data = await this.client.getInitializationData(user);
        return data;
    }

    @Public()
    @Post(AuthenticationRoutes.SignUp)
    async SignUp(
        @Req()
        req: Request<AuthenticationSignUpRequest>,
    ): Promise<AuthenticationSignUpResponse> {
        const { email, password, name } = req.body;
        return await this.client.createUser({ email, password, name });
    }

    @Post(AuthenticationRoutes.SignOut)
    async SignOut(@Req() request: Request) {
        await request.session.destroy(() => {});
        return { success: true };
    }
}
