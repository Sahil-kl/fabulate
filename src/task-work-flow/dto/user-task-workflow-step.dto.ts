import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { TaskWorkFlow } from "../entities/task-work-flow.entity";

export class CreatedUserTaskWorkFlowdto {
    @IsString()
    @ApiProperty()
    status: string;

    @IsUUID()
    @ApiProperty()
    userId: User;

    @IsUUID()
    @ApiProperty()
    assignId: User;

    @IsUUID()
    @ApiProperty()
    stepId: TaskWorkFlow;



}