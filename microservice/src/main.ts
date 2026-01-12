import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT) || 9090;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: PORT,
      },
    },
  );

  app.listen(() => {
    console.log(`Server listening on port ${PORT}...`);
    console.log(`Service version: ${process.env.APP_VERSION}`);
  });
}
bootstrap();
