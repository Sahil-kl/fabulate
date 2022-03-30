/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';


@Entity()
export class TaskAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.attachmentId)
  @JoinColumn({ name: 'attachedBy'},)
  attachedBy: User;

  @Column()
  fileExtension: string;

  @ManyToOne(() => Task, (task) => task.attachmentId, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: 'taskId'},)
  taskId:Task;


  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
