import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MorganModule, MorganInterceptor } from "nest-morgan";
import { TaskWorkFlowModule } from './task-work-flow/task-work-flow.module';
@Module({
  imports: [
    ProjectsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '31839',
      database: 'Fabulate',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TasksModule,
    UsersModule,
    MorganModule,
    TaskWorkFlowModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: MorganInterceptor("dev")
  }],
})
export class AppModule {}
