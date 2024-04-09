import {
    Controller,
    Get,
    InternalServerErrorException,
    Res,
    MessageEvent,
    Req,
} from '@nestjs/common';
import { Subject } from 'rxjs';
import { Response } from 'express';
import { Request, UUID } from '../model.js';
import { EventsService, SseMessage } from './events.service.js';

const SSE_CONNECTION_HEADERS = {
    'Cache-Control':
        'private, no-cache, no-store, must-revalidate, max-age=0, no-transform',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
};

@Controller('sse')
export class EventsController {
    /** List of connected clients */
    private readonly connectedClients = new Map<
        string,
        { close: () => void; subject: Subject<SseMessage<object>> }
    >();

    constructor(private eventsService: EventsService) {
        this.eventsService.addEventHandler((event) => {
            const { userIds = [], message } = event;
            userIds.forEach((userId) => {
                this.sendDataToClient(userId, message);
            });
        });
    }

    @Get()
    async Connect(@Req() request: Request, @Res() response: Response) {
        const validationFailed = false;

        const { user } = request;

        /* make some validation */

        if (validationFailed) {
            throw new InternalServerErrorException({
                message: 'Query failed',
                error: 100,
                status: 500,
            });
        }

        this.registerClient(user.id, response);

        // Send headers to establish SSE connection
        response.set(SSE_CONNECTION_HEADERS);

        response.flushHeaders();
    }

    handleIncomingMessage(event: SseMessage<object>) {
        this.sendToAll(event);
    }

    private sendToAll(message: SseMessage<object>) {
        const keys = Object.keys(this.connectedClients);
        keys.forEach((key) => {
            this.sendDataToClient(key, message);
        });
    }

    /** Send a SSE message to the specified client */
    private sendDataToClient(userId: UUID, message: SseMessage<object>) {
        this.connectedClients.get(userId)?.subject.next(message);
    }

    private registerClient(clientKey: string, response: Response) {
        // Create a subject for this client in which we'll push our data
        const subject = new Subject<SseMessage<object>>();
        // Add the client to our client list
        this.connectedClients.set(clientKey, {
            close: () => {
                response.end();
            }, // Will allow us to close the connection if needed
            subject, // Subject related to this client
        });

        // Create an observer that will take the data pushed to the subject and
        // write it to our connection stream in the right format
        const observer = {
            next: (message: MessageEvent) => {
                // Called when data is pushed to the subject using subject.next()
                // Encode the message as SSE (see https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events)

                // Here's an example of what it could look like, assuming msg.data is an object
                // If msg.data is not an object, you should adjust accordingly

                if (message.type) {
                    response.write(`event: ${message.type}\n`);
                }
                if (message.id) {
                    response.write(`id: ${message.id}\n`);
                }
                if (message.retry) {
                    response.write(`retry: ${message.retry}\n`);
                }
                response.write(`data: ${JSON.stringify(message.data)}\n\n`);
            },
            complete: () => {
                console.log(`observer.complete`);
            },
            error: (error: Error) => {
                console.log(`observer.error: ${error}`);
            },
        };

        // Attach the observer to the subject
        subject.subscribe(observer);

        // Handle connection closed
        response.on('close', () => {
            console.log(`Closing connection for client ${clientKey}`);
            subject.complete(); // End the observable stream
            this.connectedClients.delete(clientKey); // Remove client from the list
            response.end(); // Close connection (unsure if this is really requried, to release the resources)
        });
    }
}
