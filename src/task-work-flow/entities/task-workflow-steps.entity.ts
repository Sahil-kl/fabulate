import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskWorkFlow } from "./task-work-flow.entity";
import { userTaskWorkFlowSteps } from "./user-task-workflow-steps.entity";

@Entity()
export class taskWorkFlowSteps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    statusType: string;

    @Column()
    name: string;

    @ManyToOne(() => TaskWorkFlow, (taskWorkflow) => taskWorkflow.taskId)
    @JoinColumn({name: 'workFlowId'})
    workFlowId: TaskWorkFlow;

    @Column()
    timePercentage: number;

    @Column()
    order: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

    @OneToMany(() => userTaskWorkFlowSteps, (userTaskWorkFlowSteps) => userTaskWorkFlowSteps.stepId, { lazy: false })
    userStepId: userTaskWorkFlowSteps[]; 


    
    
}