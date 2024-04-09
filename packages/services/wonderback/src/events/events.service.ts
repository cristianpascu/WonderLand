import { Injectable } from '@nestjs/common';
import { UUID } from '@wonderland/domain';

export type SseMessage<T> = {
    type: string;
    data: T;
};

export type SseEvent<T> = {
    userIds: UUID[];
    id?: string;
    retry?: number;
    message: SseMessage<T>;
};

type EventHandler<T> = (event: SseEvent<T>) => void;

@Injectable()
export class EventsService {
    private eventHandlers: EventHandler<object>[] = [];

    constructor() {}

    addEventHandler<T extends object>(handler: EventHandler<T>) {
        this.eventHandlers.push(handler);
    }

    emit<T extends object>(userIds: UUID[], event: SseMessage<T>) {
        const { type, data } = event;
        this.eventHandlers.forEach((handler) => {
            handler({
                userIds,
                message: {
                    type,
                    data: data as T,
                },
            });
        });
    }
}
