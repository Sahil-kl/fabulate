/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, JoinColumn} from 'typeorm';
import { Task } from './task.entity';

export enum member_type_status {
    Owner = 'Owner',
    Editor= 'Editor'
  }

@Entity()
export class TaskMember {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: member_type_status,
    default: member_type_status.Editor,
  })
  memberType: member_type_status;

  @ManyToOne(() => User, (user) => user.taskId)
  @JoinColumn({name: 'memberId'})
  memberId: User;

  @ManyToOne(() => Task, (project) => project.taskMemberId)
  @JoinColumn({name: 'taskId'})
  taskId: Task;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;


}