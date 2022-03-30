import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Task, taskPriority, taskTypes } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @ApiProperty({ enum: taskTypes })
  type: taskTypes;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty({ enum: taskPriority })
  priority: taskPriority;

  @IsString()
  @ApiProperty()
  createdBy: User;

  @IsUUID()
  @ApiProperty({required : true})
  projectId: Project;

  @ApiProperty()
  due_date: Date;

  @ApiProperty({ nullable: true })
  InternalTaskId: Task;
}
