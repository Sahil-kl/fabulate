import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, UUIDVersion } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Brand } from '../entities/brand.entity';
import { projectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  @ApiProperty()
  project_name: string;

  @IsString()
  @ApiProperty()
  project_info: string;

  @IsUUID()
  @ApiProperty()
  userId: User;

  @ApiProperty({ required: false })
  due_date: Date;

  @IsUUID()
  @ApiProperty()
  brandId: Brand;

  @IsString()
  @ApiProperty({ enum: projectStatus })
  status: projectStatus;
}
