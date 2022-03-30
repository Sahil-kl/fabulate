/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Project } from './project.entity';

export enum project_member_status{
 Owner= 'Owner',
 Editor='Editor'

}

@Entity()
export class Member {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    type: 'enum',
    enum: project_member_status,
    default: project_member_status.Editor
  })
  member_type: project_member_status;

  @ManyToOne(()=> User, user=> user.project_member_id)
  @JoinColumn({name: 'memberId'})
  memberId: User;

  @ManyToOne(()=> Project, project=> project.memberId)
  @JoinColumn({name: 'projectId'})
  projectId: Project;
  
}