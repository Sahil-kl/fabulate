import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { Brand } from 'src/projects/entities/brand.entity';
import { Member } from 'src/projects/entities/member.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { TaskMember } from './entities/task-member.entity';
import { MulterModule } from '@nestjs/platform-express';
import { TaskAttachment } from './entities/attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      Project,
      Brand,
      Member,
      User,
      TaskMember,
      TaskAttachment,
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, ProjectsService, UsersService],
})
export class TasksModule {}
