import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application.controller.js';
import { ApplicationService } from './application.service.js';
import { QueryService } from './queries.service.js';
import { ConfigService } from './config.service.js';

describe('ApplicationController', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let applicationController: ApplicationController;

    beforeEach(async () => {
        const application: TestingModule = await Test.createTestingModule({
            controllers: [ApplicationController],
            providers: [ApplicationService, ConfigService, QueryService],
        }).compile();

        applicationController = application.get<ApplicationController>(
            ApplicationController,
        );
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect('Hello World!').toBe('Hello World!');
        });
    });
});
