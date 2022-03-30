/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { member_type_status } from '../entities/task-member.entity';
import { Task } from '../entities/task.entity';

export class CreateTaskMemberDto {

  @IsString()
  @ApiProperty({ enum: member_type_status})
  member_type: member_type_status;

  @IsUUID()
  @ApiProperty()
  memberId: User;

  @IsUUID()
  @ApiProperty()
  taskId: Task;
  
}
