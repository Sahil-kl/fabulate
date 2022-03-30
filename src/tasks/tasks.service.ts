import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDVersion } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';
import { Repository } from 'typeorm';
import { CreatedAttachmentDto } from './dto/attachment.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskMemberDto } from './dto/task-member.dto';
import { TaskAttachment } from './entities/attachment.entity';
import { TaskMember } from './entities/task-member.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRespostry: Repository<Task>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(TaskMember)
    private taskMemberRepositry: Repository<TaskMember>,
    @InjectRepository(TaskAttachment)
    private taskAttachmentRepositry: Repository<TaskAttachment>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      if (
        createTaskDto.type == 'sub_task' &&
        createTaskDto.InternalTaskId == null
      ) {
        return 0;
      } else if (
        createTaskDto.type == 'sub_task' &&
        createTaskDto.InternalTaskId != null
      ) {
        let data = await this.taskRespostry
          .createQueryBuilder('task')
          .leftJoinAndSelect('task.createdBy', 'Created_BY')
          .leftJoinAndSelect('task.taskMemberId', 'Task_Members')
          .leftJoinAndSelect('Task_Members.memberId', 'Users')
          .where('task.id= :taskid', { taskid: createTaskDto.InternalTaskId })
          .andWhere('task.type= :type', { type: 'internal_task' })
          .getOne();
        if (data) {
          return await this.taskRespostry.save(createTaskDto);
        }
        return 0;
      } else {
        return await this.taskRespostry.save(createTaskDto);
      }
    } catch (err) {
      console.log(err);
      return 0;
    }
  }

  async upload(file: any, createdAttachmentDto: CreatedAttachmentDto) {
    try {
      console.log(file);
      createdAttachmentDto.fileExtension = file.fileExtname;
      console.log(createdAttachmentDto.fileExtension);
      return await this.taskAttachmentRepositry.save(createdAttachmentDto);
    } catch (err) {
      return err;
    }
  }

  async addmember(createTaskMemberDto: CreateTaskMemberDto) {
    try {
      return await this.taskMemberRepositry.save(createTaskMemberDto);
    } catch (err) {
      return err;
    }
  }

  async findAll(tasktype: string) {
    return await this.taskRespostry
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.createdBy', 'Created_BY')
      .leftJoinAndSelect('task.taskMemberId', 'Members')
      .leftJoinAndSelect('Members.memberId', 'Users')
      .where('task.type= :type', { type: tasktype })
      // .andWhere('task.type= :type', { type: 'internal_task' })
      .getMany();
  }

  async getdocs(tasktype: string) {
    return await this.taskAttachmentRepositry
      .createQueryBuilder('task_attachment')
      .leftJoinAndSelect('task_attachment.attachedBy', 'User')
      .where('task_attachment.type= :type', { type: tasktype })
      // .andWhere('task.type= :type', { type: 'internal_task' })
      .getMany();
  }

  async findOne(id: unknown) {
    let data = await this.taskRespostry
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.createdBy', 'Created_BY')
      .leftJoinAndSelect('task.taskMemberId', 'Task_Members')
      .leftJoinAndSelect('Task_Members.memberId', 'Users')
      .where('task.id= :taskid', { taskid: id })
      // .andWhere('task.type= :type', { type: 'internal_task' })
      .getOne();
    if (data) {
      return data;
    }
    return 0;
  }

  async subFindOne(id: unknown) {
    console.log('heloooooooo');
    let data = await this.taskRespostry
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.createdBy', 'Created_BY')
      .leftJoinAndSelect('task.taskMemberId', 'taskMember')
      .leftJoinAndSelect('taskMember.memberId', 'Users')
      .where('task.InternalTaskId= :taskid', { taskid: id })
      .andWhere('task.type= :type', { type: 'sub_task' })
      .getMany();
    if (data) {
      return data;
    }
    return 0;
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  async remove(id: UUIDVersion) {
    try {
      return await this.taskRespostry.delete(id);
    } catch (err) {
      return err;
    }
  }
}
