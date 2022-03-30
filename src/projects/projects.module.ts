import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Member } from './entities/member.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Brand, Member, User])],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
