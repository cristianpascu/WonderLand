import { PrismaClient } from '@prisma/client';
import { UUID, Users } from '../index.mjs';
import { UserWithoutPassword } from '../model/types.mjs';

export class UserQueries {
    private constructor(private readonly client: PrismaClient) {}

    public static create(client: PrismaClient) {
        return new UserQueries(client);
    }

    async createUser(user: {
        email: string;
        name: string;
        password: string;
    }): Promise<UserWithoutPassword> {
        const { email, name, password } = user;
        const u: Users = await this.client.users.create({
            data: {
                email,
                name,
                password,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        return u;
    }

    async updateUserPassword(id: UUID, password: string): Promise<boolean> {
        const u: Users = await this.client.users.update({
            where: {
                id,
            },
            data: {
                password,
            },
        });
        return !!u;
    }

    async validateUserCredential(
        email: string,
        compare: (password: string) => Promise<boolean>,
    ): Promise<UserWithoutPassword | null> {
        const u: Users = await this.client.users.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
            },
        });
        if (!u) {
            return null;
        }

        const valid = await compare(u.password);
        if (!valid) {
            return null;
        }

        const user: Partial<Users> = u;
        delete user.password;
        return u;
    }

    async findByEmail(email: string): Promise<UserWithoutPassword | null> {
        const u: UserWithoutPassword = await this.client.users.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        return u;
    }

    async findById(id: UUID): Promise<UserWithoutPassword | null> {
        const u: UserWithoutPassword = await this.client.users.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        return u;
    }

    async findAllByIds(ids: UUID[]): Promise<UserWithoutPassword[]> {
        const users: UserWithoutPassword[] = await this.client.users.findMany({
            where: {
                id: { in: ids },
            },
            select: {
                id: true,
                email: true,
                name: true,
                Accounts: {
                    select: {
                        id: true,
                        profileId: true,
                        email: true,
                        profile: true,
                    },
                },
            },
        });
        return users;
    }
}
