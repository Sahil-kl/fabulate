import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';
import { CreateTaskMemberDto } from './dto/task-member.dto';
import { taskTypes } from './entities/task.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatedAttachmentDto } from './dto/attachment.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { attchmentType } from './entities/attachment.entity';

const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${fileExtName}`);
};

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|doc|docx|txt|xls|xlsx|pdf|mp4|mov)$/)) {
    return callback(new Error('Only image and documents files are allowed!'), false);
  }
  callback(null, true);
};

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectSeervice: ProjectsService,
    private readonly userService: UsersService,
  ) {}

  @Post('create')
  @ApiOkResponse()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res) {
    try {
      let checkCreatedBy = await this.userService.findOne(
        createTaskDto.createdBy,
      );
      let checkProjectId = await this.projectSeervice.findOne(
        createTaskDto.projectId,
      );
      if (!checkCreatedBy) {
        res.json({
          status: 400,
          message: 'No User found (User id is incorrect)',
        });
      } else if (!checkProjectId) {
        res.json({
          status: 400,
          message: 'No project found (Project id is incorrect)',
        });
      } else {
        let data = await this.tasksService.create(createTaskDto);
        if (data == 0) {
          res.json({
            status: 400,
            message:
              'Internal Task id is required for sub task || Provided One is not valid',
          });
        } else {
          res.json({
            status: 200,
            message: 'Task is created',
            Data: data,
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

  @Post('member')
  async addMember(
    @Body() createTaskMemberDto: CreateTaskMemberDto,
    @Res() res,
  ) {
    try {
      let checkUserId = await this.userService.findOne(
        createTaskMemberDto.memberId,
      );
      let checkTaskId = await this.tasksService.findOne(
        createTaskMemberDto.taskId,
      );
      if (!checkUserId) {
        res.json({
          status: 400,
          message: 'No User found (User id is incorrect)',
        });
      } else if (!checkTaskId) {
        res.json({
          status: 400,
          message: 'No Task found (Task id is incorrect)',
        });
      } else {
        let data = await this.tasksService.addmember(createTaskMemberDto);
        res.json({
          status: 200,
          message: 'Member assigned ',
          Data: data,
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

  @Post('attachments')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createdAttachmentDto: CreatedAttachmentDto,
    @Res() res,
  ) {
    try {
      let checkUserId = await this.userService.findOne(
        createdAttachmentDto.attachedBy,
      );
      let checkTaskId = await this.tasksService.findOne(
        createdAttachmentDto.taskId,
      );
      if (!checkUserId) {
        res.json({
          status: 400,
          message: 'No User found (User id is incorrect)',
        });
      } else if (!checkTaskId) {
        res.json({
          status: 400,
          message: 'No Task found (Task id is incorrect)',
        });
      } else {
        const response = [];
        files.forEach(async (file) => {
          const fileReponse = {
            originalname: file.originalname,
            fileExtname: file.filename,
          };
          response.push(fileReponse);
          let data = await this.tasksService.upload(
            fileReponse,
            createdAttachmentDto,
          );
          // console.log('data', data);
        });
        res.json({
          status: 200,
          message: 'Files uploaded',
          Data: response,
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

  @ApiParam({ name: 'type', enum: taskTypes })
  @Get('all/:type')
  async findAll(@Res() res, @Param('type') type: string) {
    let data = await this.tasksService.findAll(type);
    res.json({
      status: 200,
      message: `All ${type}`,
      Data: data,
    });
  }

  @ApiParam({ name: 'fileType', enum: attchmentType })
  @Get('attachments/alldocs/:fileType')
  async docs(@Res() res, @Param('fileType') fileType: string) {
    let data = await this.tasksService.getdocs(fileType)
    res.json({
      status: 200,
      message: `All ${fileType}`,
      Data: data
    });
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  async findOne(@Param('id') id: UUIDVersion, @Res() res) {
    let data = await this.tasksService.findOne(id);
    console.log(data);
    if (data == 0) {
      res.json({
        status: 400,
        message: 'No Task Found',
      });
    } else {
      res.json({
        status: 200,
        message: 'Task Found',
        Data: data,
      });
    }
  }

  @ApiParam({ name: 'subId' })
  @Get('sub/:subId')
  async SUBfindOne(@Param('subId') subId: UUIDVersion, @Res() res) {
    let data = await this.tasksService.subFindOne(subId);
    console.log(data);
    if (data == 0) {
      res.json({
        status: 400,
        message: 'No Task Found',
      });
    } else {
      res.json({
        status: 200,
        message: 'Task Found',
        Data: data,
      });
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  async remove(@Param('id') id: UUIDVersion, @Res() res) {
    let deleted = await this.tasksService.remove(id);
    res.json({
      status: 200,
      message: 'Task is Deleted',
      Data: deleted,
    });
  }

}



