import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  brand_name?: string;
  brand_industry?: string;
  brand_url?: string;
  brand_description?: string;
}
