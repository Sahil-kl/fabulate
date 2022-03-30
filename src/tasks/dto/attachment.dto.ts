/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {  IsUUID } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Task } from '../entities/task.entity';

export class CreatedAttachmentDto {

  @IsUUID()
  @ApiProperty()
  attachedBy: User;

  @ApiProperty()
  fileExtension: string;

  @IsUUID()
  @ApiProperty()
  taskId: Task;
  
}
