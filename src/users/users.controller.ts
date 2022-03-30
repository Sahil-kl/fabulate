import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      let checkUserEmail = await this.usersService.findOne({
        email: createUserDto.email,
      });
      console.log(checkUserEmail);
      if (checkUserEmail) {
        res.json({
          status: 400,
          message: 'Email is already in use',
        });
      } else {
        let data = await this.usersService.create(createUserDto);
        res.json({
          status: 200,
          message: 'User is added',
          Data: data,
        });
      }
    } catch (err) {
      res.json({
        status: 401,
        message: 'Error Occured',
        Error: {
          detail: err.detail,
          table: err.table,
        },
      });
    }
  }

  @Get()
  async findAll(@Res() res) {
    let data = await this.usersService.findAll();
    res.json({
      status: 200,
      message: 'Data Found',
      Data: data,
    });
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    let data = await this.usersService.findOne(id);
    if (data == 0) {
      res.json({
        status: 400,
        message: 'No User Found',
        Data: data,
      });
    } else {
      res.json({
        status: 200,
        message: 'User Found',
        Data: data,
      });
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: UUIDVersion, @Res() res) {
    let deleted = await this.usersService.remove(id);
    res.json({
      status: 200,
      message: 'User Found',
      Data: deleted,
    });
  }
}
