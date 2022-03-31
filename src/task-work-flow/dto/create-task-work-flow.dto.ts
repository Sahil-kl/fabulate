import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { workflow_tasktype } from "../entities/task-work-flow.entity";

export class CreateTaskWorkFlowDto {
    @ApiProperty()
    @IsString()
    name: string;

    @IsString()
    @ApiProperty({ enum: workflow_tasktype })
    type: workflow_tasktype;

}
