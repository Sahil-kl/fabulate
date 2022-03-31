import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";
import { TaskWorkFlow } from "../entities/task-work-flow.entity";

export class CreatedTaskWorkFlowStepDto {
    @IsString()
    @ApiProperty()
    statusType: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsUUID()
    @ApiProperty()
    workFlowId: TaskWorkFlow;

    @IsNumber()
    @ApiProperty()
    timePercentage: number;

    @IsNumber()
    @ApiProperty()
    order: number;


}