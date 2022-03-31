import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TaskWorkFlowService } from './task-work-flow.service';
import { CreateTaskWorkFlowDto } from './dto/create-task-work-flow.dto';
import { UpdateTaskWorkFlowDto } from './dto/update-task-work-flow.dto';
import { CreatedTaskWorkFlowStepDto } from './dto/task-workflow-step.dto';
import { CreatedUserTaskWorkFlowdto } from './dto/user-task-workflow-step.dto';
import { UsersService } from 'src/users/users.service';

@Controller('task-work-flow')
export class TaskWorkFlowController {
  constructor(private readonly taskWorkFlowService: TaskWorkFlowService,
    private readonly userService: UsersService) {}

  @Post('create')
  async create(@Body() createTaskWorkFlowDto: CreateTaskWorkFlowDto, @Res() res) {
   try {
    let data= await this.taskWorkFlowService.create(createTaskWorkFlowDto);
    if ( data == 0) {
      res.json({
        status: 400,
        message: 'Failed',
      });
    }
    else {
      res.json({
        status: 400,
        message: 'Success',
        Data: data
      });
    }
   } catch (err) {
    res.json({
      status: 401,
      message: 'Error Occured',
      Error: {
        detail: err.detail,
        table: err.table,
      },
    });
   }
  }

  @Post('create/workFlowStep')
  async createworkflowstep(@Body() createdTaskWorkFlowStepDto: CreatedTaskWorkFlowStepDto, @Res() res) {
   try {
    let checkWorkFlowId = await this.taskWorkFlowService.findOne(createdTaskWorkFlowStepDto.workFlowId)
    if (!checkWorkFlowId) {
      res.json({
        status: 400,
        message: 'Invalid workflow ID',
      });
    } else {
      let data= await this.taskWorkFlowService.createWorkFlowstep(createdTaskWorkFlowStepDto);
    if ( data == 0) {
      res.json({
        status: 400,
        message: 'Failed',
      });
    }
    else {
      res.json({
        status: 400,
        message: 'Success',
        Data: data
      });
    }
    }
   } catch (err) {
    res.json({
      status: 401,
      message: 'Error Occured',
      Error: {
        detail: err.detail,
        table: err.table,
      },
    });
   }
  }

  @Post('create/userWorkFlowStep')
  async createUserWorkFlow(@Body() createdUserTaskWorkFlowdto: CreatedUserTaskWorkFlowdto, @Res() res) {
    let checkUserId= await this.userService.findOne(createdUserTaskWorkFlowdto.userId)
    let checkAssignId= await this.userService.findOne(createdUserTaskWorkFlowdto.assignId)
    let checkStepId= await this.userService.findOne(createdUserTaskWorkFlowdto.stepId)

    if(!checkAssignId || !checkStepId || !checkUserId) {
      res.json({
        status: 400,
        message: `Validation failed`,
      });
    }
    else
    {
      let data= await this.taskWorkFlowService.createUserWorkFlowstep(createdUserTaskWorkFlowdto);
      if ( data == 0) {
        res.json({
          status: 400,
          message: 'Failed',
        });
      }
      else {
        res.json({
          status: 400,
          message: 'Success',
          Data: data
        });
      }
    }
  }

  @Get()
  async findAll(@Res() res) {
    let data = await this.taskWorkFlowService.findAll();
    if ( data == 0) {
      res.json({
        status: 400,
        message: 'Failed',
      });
    }
    else {
      res.json({
        status: 400,
        message: 'Success',
        Data: data
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskWorkFlowService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskWorkFlowDto: UpdateTaskWorkFlowDto) {
    return this.taskWorkFlowService.update(+id, updateTaskWorkFlowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskWorkFlowService.remove(+id);
  }
}
