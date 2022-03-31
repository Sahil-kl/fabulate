import { Task } from "src/tasks/entities/task.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { taskWorkFlowSteps } from "./task-workflow-steps.entity";

export enum workflow_tasktype {
    Internal= 'Internal',
    Content= 'Content',
    Sub= 'Sub'
}

@Entity()
export class TaskWorkFlow {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

    @Column({
        type: 'enum',
        enum: workflow_tasktype,
        default: workflow_tasktype.Internal,
      })
      type: workflow_tasktype;

      @OneToMany(() => Task, (task) => task.workFlowId, { lazy: false })
      taskId: Task[];  

      @OneToMany(() => taskWorkFlowSteps, (task) => task.workFlowId, { lazy: false })
      workFlowStepId: taskWorkFlowSteps[]; 


    
}
