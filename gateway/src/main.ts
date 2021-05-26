import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('CRUDX Example')
  .setDescription('This is a litlle but very complete CRUDX for an generic entity.')
  .setVersion('1.0')
  .addTag('Recourses')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  app.enableCors();
  
  await app.listen(5000);
}
bootstrap();
