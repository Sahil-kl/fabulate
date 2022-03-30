import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UUIDVersion } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRespositry: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return await this.userRespositry.save(createUserDto);
  }

  async findAll() {
    return await this.userRespositry.find();
  }

  async findOne(id: unknown) {
    let data = await this.userRespositry.findOne(id);
    if (data) {
      return data;
    }
    return 0;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: UUIDVersion) {
    return await this.userRespositry.delete(id);
  }
}
