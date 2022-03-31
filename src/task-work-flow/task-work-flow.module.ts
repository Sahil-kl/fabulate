import { Module } from '@nestjs/common';
import { TaskWorkFlowService } from './task-work-flow.service';
import { TaskWorkFlowController } from './task-work-flow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskWorkFlow } from './entities/task-work-flow.entity';
import { taskWorkFlowSteps } from './entities/task-workflow-steps.entity';
import { userTaskWorkFlowSteps } from './entities/user-task-workflow-steps.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskWorkFlow, taskWorkFlowSteps, userTaskWorkFlowSteps, User])],
  controllers: [TaskWorkFlowController],
  providers: [TaskWorkFlowService, UsersService]
})
export class TaskWorkFlowModule {}
