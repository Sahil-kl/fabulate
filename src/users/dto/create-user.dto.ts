import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsNumber()
  @ApiProperty()
  phone: number;

  @IsString()
  @ApiProperty()
  username: string;

  @IsNumber()
  @ApiProperty()
  postcode: number;

  @IsString()
  @ApiProperty()
  address: string;
}
