/* eslint-disable prettier/prettier */
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

export enum taskTypes {
  Internal = 'internal_task',
  Sub= 'sub_task'
}
export enum taskPriority {
  Low = 'Low',
  Medium= 'Medium',
  High= 'High'
}
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskAttachment } from './attachment.entity';
import { TaskMember } from './task-member.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: taskTypes,
    default: taskTypes.Internal,
  })
  type: taskTypes;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column(
    {
      type: 'enum',
      enum: taskPriority,
      default: taskPriority.Medium,
    }
  )
  priority: taskPriority;

  @ManyToOne(() => User, (user) => user.taskId)
  @JoinColumn({name: 'createdBy'})
  createdBy: User;

  @ManyToOne(() => Project, (project) => project.taskId)
  @JoinColumn({name: 'projectId'})
  projectId: Project;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @OneToMany(() => TaskMember, (taskmember) => taskmember.taskId, { lazy: false })
  taskMemberId: TaskMember[];

  @ManyToOne(() => Task, (task) => task.subTask, {onDelete: 'SET NULL'} )
  @JoinColumn({ name: 'InternalTaskId'},)
  InternalTaskId:Task;

  @OneToMany( ()=> Task, (task) => task.InternalTaskId, { lazy: false })
  subTask: Task[];

  @OneToMany(
    () => TaskAttachment,
    (taskAttachment) => taskAttachment.taskId,
    { lazy: false },
  )
  attachmentId: TaskAttachment[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
