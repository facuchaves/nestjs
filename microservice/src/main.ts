import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { EntityModule } from './entity.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EntityModule,
    {
      transport: Transport.TCP,
    },
  );
  app.listen(() => {});
}
bootstrap();