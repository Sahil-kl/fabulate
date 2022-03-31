import { Test, TestingModule } from '@nestjs/testing';
import { TaskWorkFlowController } from './task-work-flow.controller';
import { TaskWorkFlowService } from './task-work-flow.service';

describe('TaskWorkFlowController', () => {
  let controller: TaskWorkFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskWorkFlowController],
      providers: [TaskWorkFlowService],
    }).compile();

    controller = module.get<TaskWorkFlowController>(TaskWorkFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
