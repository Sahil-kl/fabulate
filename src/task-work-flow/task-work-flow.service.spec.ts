import { Test, TestingModule } from '@nestjs/testing';
import { TaskWorkFlowService } from './task-work-flow.service';

describe('TaskWorkFlowService', () => {
  let service: TaskWorkFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskWorkFlowService],
    }).compile();

    service = module.get<TaskWorkFlowService>(TaskWorkFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
