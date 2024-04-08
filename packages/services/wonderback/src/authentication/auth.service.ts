import { Injectable } from '@nestjs/common';
import { QueryService } from '../queries.service.js';
import { UUID, UserWithoutPassword, Users } from '@wonderland/domain';
import { compare, hash } from 'bcrypt';

import crypto from 'crypto';
import { SendGridService } from '../sendgrid.service.js';

const ALGORITHM = 'aes-256-ctr';

const RESET_PASSWORD_SECRET = 'hash which the original creator generated';
// key and iv
const ENCRYPT_KEY = crypto
    .createHash('sha256')
    .update(RESET_PASSWORD_SECRET)
    .digest('base64')
    .substring(0, 32);
const ENCRYPT_INIT_VECTOR = crypto.randomBytes(16);

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly queries: QueryService,
        private readonly sendgrid: SendGridService,
    ) {}

    async findById(id: UUID) {
        const user = await this.queries.users.findById(id);
        return user;
    }

    async validateUser(
        email: string,
        password: string,
    ): Promise<Omit<Users, 'password'> | null> {
        const user = await this.queries.users.validateUserCredential(
            email,
            async (userPassword) => {
                return await compare(password, userPassword);
            },
        );
        return user;
    }

    async createUser({
        email,
        name,
        password,
    }: {
        email: string;
        name: string;
        password: string;
    }) {
        const u = await this.queries.users.findByEmail(email);
        if (u) {
            throw new Error(`A user is already registered with email ${email}`);
        }
        const saltOrRounds = 10;
        const hashedPassword = await hash(password, saltOrRounds);
        const user = await this.queries.users.createUser({
            name,
            email,
            password: hashedPassword,
        });
        return user;
    }

    async getInitializationData(user: UserWithoutPassword) {
        return {
            user,
        };
    }

    async sendResetPasswordEmail(email: string) {
        const user = await this.queries.users.findByEmail(email);
        if (!user) {
            return {
                success: false,
                reason: 'user_does_not_exist',
                message: 'No user registered with provided email address.',
            };
        }

        const { id } = user;
        const expires = Date.now() + 60 * 60 * 1000;
        const hash = this.encrypt({
            id,
            email,
            expires,
        });

        await this.sendgrid.sendResetPasswordEmail({
            user,
            link: 'https://app.playlistool.com/password/reset/' + hash,
        });
        return { success: true };
    }

    async resetPassword(email: string, password: string, link: string) {
        const {
            id,
            email: storedEmail,
            expires,
        } = this.decrypt<{
            id: UUID;
            email: string;
            expires: number;
        }>(link);
        const now = Date.now();
        if (isNaN(expires) || expires < now) {
            return {
                success: false,
                reason: 'password_reset_link_expired',
                message: 'Provided update password link has expired',
            };
        }
        if (email != storedEmail) {
            return {
                success: false,
                reason: 'password_reset_link_invalid',
                message: 'Invalid password reset link',
            };
        }
        const user = await this.queries.users.findByEmail(email);
        if (!user || id !== user.id) {
            return {
                success: false,
                reason: 'user_does_not_exist',
                message: 'No user has requested this password update.',
            };
        }

        const hashedPassword = await this.hashPassword(password);
        const updated = await this.queries.users.updateUserPassword(
            id,
            hashedPassword,
        );

        return {
            success: updated,
        };
    }

    private encrypt(data: object): string {
        // Create a new cipher using the algorithm, key, and iv
        const cipher = crypto.createCipheriv(
            ALGORITHM,
            ENCRYPT_KEY,
            ENCRYPT_INIT_VECTOR,
        );
        // Create the new (encrypted) buffer
        const result = Buffer.concat([
            ENCRYPT_INIT_VECTOR,
            cipher.update(JSON.stringify(data)),
            cipher.final(),
        ]);
        return result.toString('base64url');
    }

    private decrypt<T>(content: string): T {
        let encrypted = Buffer.from(content, 'base64url');
        // Get the iv: the first 16 bytes
        const initVector = encrypted.subarray(0, 16);
        // Get the rest
        encrypted = encrypted.subarray(16);
        // Create a decipher
        const decipher = crypto.createDecipheriv(
            ALGORITHM,
            ENCRYPT_KEY,
            initVector,
        );
        // Actually decrypt it
        const result = Buffer.concat([
            decipher.update(encrypted),
            decipher.final(),
        ]);
        return JSON.parse(result.toString());
    }

    private async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hashedPassword = await hash(password, saltOrRounds);
        return hashedPassword;
    }
}
