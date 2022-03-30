import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fabulate')
    .setDescription('Preparing basic api')
    .setVersion('1.0')
    .addTag('Projects')
    .addBearerAuth()
    // .addServer('http://192.168.1.38:4000')
    .addServer('http://localhost:4000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
