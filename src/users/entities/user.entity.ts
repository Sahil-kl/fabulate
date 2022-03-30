import { Member } from 'src/projects/entities/member.entity';
import { Project } from 'src/projects/entities/project.entity';
import { TaskAttachment } from 'src/tasks/entities/attachment.entity';
import { TaskMember } from 'src/tasks/entities/task-member.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Entity,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column()
  username: string;

  @Column()
  postcode: number;

  @Column()
  address: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Project, (project) => project.userId, { lazy: false })
  projectId: Project[];

  @OneToMany(() => TaskMember, (taskMember) => taskMember.memberId, {
    lazy: false,
  })
  taskMemberId: TaskMember[];

  @OneToMany(() => Task, (task) => task.createdBy, {
    lazy: false,
  })
  taskId: TaskMember[];

  @OneToMany(() => Member, (member) => member.memberId, {
    lazy: false,
  })
  project_member_id: Member[];

  @OneToMany(
    () => TaskAttachment,
    (taskAttachment) => taskAttachment.attachedBy,
    { lazy: false },
  )
  attachmentId: TaskAttachment[];
}
