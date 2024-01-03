import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { PrismaClientService } from './prismaclient.service';
import { ConfigService } from './config.service';

describe('ApplicationController', () => {
    let applicationController: ApplicationController;

    beforeEach(async () => {
        const application: TestingModule = await Test.createTestingModule({
            controllers: [ApplicationController],
            providers: [ApplicationService, ConfigService, PrismaClientService],
        }).compile();

        applicationController = application.get<ApplicationController>(
            ApplicationController,
        );
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(applicationController.getHello()).toBe('Hello World!');
        });
    });
});
