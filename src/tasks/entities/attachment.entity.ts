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

export enum attchmentType {
  Image = 'image',
  Document= 'document',
  Video= 'video'
}


@Entity()
export class TaskAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: attchmentType,
  })
  type: attchmentType;

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
