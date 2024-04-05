import { Controller, Get, Req } from '@nestjs/common';

import { AppRequest, AppResponse } from '@wonderland/common';

import { ApplicationService } from './application.service.js';
import { Public } from './authentication/public.js';
import { Request } from './model.js';

import { AuthenticationService } from './authentication/auth.service.js';

@Controller('')
export class ApplicationController {
    constructor(
        private readonly applicationService: ApplicationService,
        private readonly authService: AuthenticationService,
    ) {}

    @Get('')
    @Public()
    async getHello(
        @Req() request: Request<AppRequest>,
    ): Promise<AppResponse | void> {
        const user = await request.user;
        if (!user) {
            return;
        }
        const data = await this.authService.getInitializationData(user);
        return data;
    }
}
