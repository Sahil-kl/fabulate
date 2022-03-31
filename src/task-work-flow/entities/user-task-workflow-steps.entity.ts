import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { taskWorkFlowSteps } from "./task-workflow-steps.entity";

@Entity()
export class userTaskWorkFlowSteps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    status: string;

    @Column({ type: 'timestamp', nullable: true })
    dueDate: Date;

    @ManyToOne(() => taskWorkFlowSteps, (taskWorkFlowSteps) => taskWorkFlowSteps.userStepId)
    @JoinColumn({name: 'stepId'})
    stepId: taskWorkFlowSteps;

    @ManyToOne(() => User, (user) => user.userStepId)
    @JoinColumn({name: 'userId'})
    userId: User;

    @ManyToOne(() => User, (user) => user.stepAssignId)
    @JoinColumn({name: 'userId'})
    assignId: User;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;


}