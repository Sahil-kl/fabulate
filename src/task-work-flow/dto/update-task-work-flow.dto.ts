import { PartialType } from '@nestjs/swagger';
import { CreateTaskWorkFlowDto } from './create-task-work-flow.dto';

export class UpdateTaskWorkFlowDto extends PartialType(CreateTaskWorkFlowDto) {}
