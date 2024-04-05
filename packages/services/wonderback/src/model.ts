import { Users } from '@wonderland/domain';
import { Request as ExpressRequest } from 'express';

export * from '@wonderland/domain';

export type Request<
    ReqBody = void,
    ResBody = void,
    ReqParams = void,
> = ExpressRequest<ReqParams, ResBody, ReqBody> & {
    user: Omit<Users, 'password'>;
};
