import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Member } from './member.entity';

export enum projectStatus {
  In_process = 'In_process',
  Completed = 'Completed',
  Archived = 'Archived',
  Draft = 'Draft',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  project_name: string;

  @Column()
  project_info: string;

  @ManyToOne(() => User, (user) => user.projectId)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @OneToOne(() => Brand, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'brandId' })
  brandId: Brand;

  @OneToMany(() => Member, (member) => member.projectId, { lazy: false })
  memberId: Member[];

  @OneToMany(() => Task, (task) => task.projectId, { lazy: false })
  taskId: Task[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @Column({
    type: 'enum',
    enum: projectStatus,
    default: projectStatus.Draft,
  })
  status: projectStatus;
}
