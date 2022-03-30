import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateBrandDto } from './dto/brand.dto';
import { CreateMemberDto } from './dto/member.dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import { UsersService } from 'src/users/users.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly userService: UsersService,
  ) {}

  @Post('create')
  async create(@Body() createProjectDto: CreateProjectDto, @Res() res) {
    try {
      let id = createProjectDto.userId;
      let checkUserId = await this.userService.findOne(id);
      if (!checkUserId) {
        res.json({
          status: 400,
          message: 'No user found (User id is incorrect)',
          userId: createProjectDto.userId,
        });
      } else {
        let data = await this.projectsService.create(createProjectDto);
        if (data == 0) {
          res.json({
            status: 400,
            message: 'No brand found (Brand id is Incorrecf)',
            brandId: createProjectDto.brandId,
          });
        } else {
          res.json({
            status: 200,
            message: 'Project is created',
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

  @Post('brand')
  @ApiCreatedResponse({ description: 'Brand Created' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  async addBrand(@Body() createBrandDto: CreateBrandDto, @Res() res) {
    let data = await this.projectsService.addBrand(createBrandDto);
    if (data == 0) {
      res.json({
        status: 400,
        message: 'Brand name is already in use',
      });
    } else {
      res.json({
        status: 200,
        message: 'Brand is created',
        Data: data,
      });
    }
  }

  @Post('member')
  @ApiCreatedResponse({ description: 'Member added' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  async addMember(@Body() createMemberDto: CreateMemberDto, @Res() res) {
    try {
      let checkUserId = await this.userService.findOne(
        createMemberDto.member_id,
      );
      let checkProjectId = await this.projectsService.findOne(
        createMemberDto.projectId,
      );
      if (!checkUserId) {
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
        let data = await this.projectsService.addmember(createMemberDto);
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

  @Get('all')
  @ApiOkResponse()
  async findAll(@Res() res) {
    let data = await this.projectsService.findAll();
    res.json({
      status: 200,
      message: 'All Projects',
      Data: data,
    });
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  async findOne(@Param('id') id: UUIDVersion, @Res() res) {
    try {
      let data = await this.projectsService.findOne(id);
      if (data == 0) {
        res.json({
          status: 400,
          message: 'No Project found',
        });
      } else {
        res.json({
          status: 200,
          message: 'Project found',
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   return this.projectsService.update(+id, updateProjectDto);
  // }
  @ApiParam({ name: 'id' })
  @Delete(':id')
  async remove(@Param('id') id: UUIDVersion, @Res() res) {
    let data = await this.projectsService.remove(id);
    res.json({
      status: 200,
      message: 'Project is deleted',
      Data: data,
    });
  }
}
