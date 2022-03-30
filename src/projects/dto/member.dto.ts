/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { project_member_status } from '../entities/member.entity';
import { Project } from '../entities/project.entity';

export class CreateMemberDto {

  @IsString()
  @ApiProperty({enum: project_member_status})
  member_type: project_member_status;

  @IsUUID()
  @ApiProperty()
  member_id: User;

  @IsUUID()
  @ApiProperty()
  projectId: Project;
}
