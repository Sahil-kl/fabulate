import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDVersion } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/brand.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateMemberDto } from './dto/member.dto';
import { Brand } from './entities/brand.entity';
import { Member } from './entities/member.entity';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Member)
    private memberRepositry: Repository<Member>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    let checkBrandId = await this.brandRepository.findOne(
      createProjectDto.brandId,
    );
    if (checkBrandId) {
      return await this.projectRepository.save(createProjectDto);
    }
    return 0;
  }

  async addBrand(createBrandDto: CreateBrandDto) {
    try {
      let checkBrandName = await this.brandRepository.findOne({
        brand_name: createBrandDto.brand_name,
      });
      if (checkBrandName) {
        return 0;
      }
      return await this.brandRepository.save(createBrandDto);
    } catch (err) {
      return err;
    }
  }

  async addmember(createMemberDto: CreateMemberDto) {
    try {
      return await this.memberRepositry.save(createMemberDto);
    } catch (err) {
      return err;
    }
  }

  async findAll() {
    const data = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.userId', 'User')
      .leftJoinAndSelect('project.memberId', 'Member')
      .leftJoinAndSelect('Member.memberId', 'Users')
      .leftJoinAndSelect('project.taskId', 'Task')
      // .loadRelationCountAndMap('project.taskId', 'project.taskId')
      // .where('Task.type = :type', { type: 'internal_task' })
      .getMany();
    if (data) {
      return data;
    }
    return `No data Found`;
  }

  async findOne(id: unknown) {
    try {
      let data = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.userId', 'User')
        .leftJoinAndSelect('project.memberId', 'Member')
        .leftJoinAndSelect('Member.memberId', 'Users')
        .leftJoinAndSelect('project.taskId', 'Task')
        // .loadRelationCountAndMap('project.taskId', 'project.taskId')
        // .where('Task.type = :type', { type: 'internal_task' })
        .andWhere('project.id= :projectid', { projectid: id })
        .getOne();
      if (data) {
        return data;
      }
      return 0;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }

  async remove(id: UUIDVersion) {
    try {
      return await this.projectRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
