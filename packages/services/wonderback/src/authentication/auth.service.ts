import { Injectable } from '@nestjs/common';
import { QueryService } from '../queries.service.js';
import { UUID, UserWithoutPassword, Users } from '@wonderland/domain';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(private readonly queries: QueryService) {}

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
}
