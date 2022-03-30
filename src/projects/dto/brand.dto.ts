/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @ApiProperty()
  brand_name: string;

  @IsString()
  @ApiProperty()
  brand_industry: string;

  @IsString()
  @ApiProperty()
  brand_url: string;

  @IsString()
  @ApiProperty()
  brand_description: string;
}
