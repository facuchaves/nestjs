require('newrelic');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: process.env.MICROSERVICE_HOST,
      port: parseInt(process.env.MICROSERVICE_POST),
    },
  });

  await app.startAllMicroservicesAsync();

  const config = new DocumentBuilder()
  .setTitle('CRUDX Example')
  .setDescription('This is a litlle but very complete CRUDX for an generic entity.')
  .setVersion('1.0')
  .addTag('Recourses')
  .addCookieAuth('x-token',{ description:'here is a description, maybe can give a default value' } as SecuritySchemeObject)
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  app.enableCors();
  
  const PORT = process.env.PORT || 8080;

  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}

bootstrap();
