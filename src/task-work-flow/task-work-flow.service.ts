import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskWorkFlowDto } from './dto/create-task-work-flow.dto';
import { CreatedTaskWorkFlowStepDto } from './dto/task-workflow-step.dto';
import { UpdateTaskWorkFlowDto } from './dto/update-task-work-flow.dto';
import { CreatedUserTaskWorkFlowdto } from './dto/user-task-workflow-step.dto';
import { TaskWorkFlow } from './entities/task-work-flow.entity';
import { taskWorkFlowSteps } from './entities/task-workflow-steps.entity';
import { userTaskWorkFlowSteps } from './entities/user-task-workflow-steps.entity';

@Injectable()
export class TaskWorkFlowService {
  constructor(
    @InjectRepository(TaskWorkFlow)
    private taskWorkFlowRepositry: Repository<TaskWorkFlow>,
    @InjectRepository(taskWorkFlowSteps)
    private taskWorkFlowStepRepositry: Repository<taskWorkFlowSteps>,
    @InjectRepository(userTaskWorkFlowSteps)
    private userTaskWorkFlowStepsRepositry: Repository<userTaskWorkFlowSteps>
    ) {}
  async create(createTaskWorkFlowDto: CreateTaskWorkFlowDto) {
    let data = await this.taskWorkFlowRepositry.save(createTaskWorkFlowDto);
    if (data) {
      return data;
    }
    return 0;
  }

  async createWorkFlowstep(createdTaskWorkFlowStepDto: CreatedTaskWorkFlowStepDto) {
    let data = await this.taskWorkFlowStepRepositry.save(createdTaskWorkFlowStepDto)
    if (data) {
      return data;
    }
    return 0;
  }

  async createUserWorkFlowstep(createdUserTaskWorkFlowStepDto: CreatedUserTaskWorkFlowdto) {
    let data = await this.userTaskWorkFlowStepsRepositry.save(createdUserTaskWorkFlowStepDto)
    if (data) {
      return data;
    }
    return 0;
  }

  async findAll(){
    let data = this.taskWorkFlowRepositry.find();
    if (data) {
      return data;
    }
    return 0;
  }

  async findOne(id: unknown) {
    return await this.taskWorkFlowRepositry.findOne(id);
  }

  update(id: number, updateTaskWorkFlowDto: UpdateTaskWorkFlowDto) {
    return `This action updates a #${id} taskWorkFlow`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskWorkFlow`;
  }
}
