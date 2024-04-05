export type UUID = string;

export type Users = {
    id: UUID;

    name: string;
    email: string;
    password: string;
};

export type UserWithoutPassword = Omit<Users, 'password'>;
