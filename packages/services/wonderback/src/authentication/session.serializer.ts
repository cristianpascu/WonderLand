import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthenticationService } from './auth.service.js';
import { UUID, Users } from '@wonderland/domain';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly authService: AuthenticationService) {
        super();
    }
    serializeUser(
        user: Omit<Users, 'password'>,
        done: (err: Error | null, user: { id: UUID }) => void,
    ) {
        done(null, { id: user.id! });
    }

    async deserializeUser(
        payload: { id: UUID; role: string },
        done: (err: Error | null, user: Omit<Users, 'password'> | null) => void,
    ) {
        try {
            const user = await this.authService.findById(payload.id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
}
