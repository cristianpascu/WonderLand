import { UUID } from '@wonderland/domain';

export type ApplicationInitializationData = {
    user?: { id: UUID; email: string; name: string };
};

export * from './api/index.mjs';
export * from './types.mjs';
