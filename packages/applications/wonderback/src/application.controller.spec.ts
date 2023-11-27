import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './application.controller';
import { ApplicationService } from './application.service';

describe('AppController', () => {
    let applicationController: AppController;

    beforeEach(async () => {
        const application: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [ApplicationService],
        }).compile();

        applicationController = application.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(applicationController.getHello()).toBe('Hello World!');
        });
    });
});
