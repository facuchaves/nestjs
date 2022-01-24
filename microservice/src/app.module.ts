import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericEntity } from './entity/entities/generic-entity.entity';
import { EntityModule } from './entity/entity.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DDBB_HOST,
      username: process.env.DDBB_USERNAME,
      password: process.env.DDBB_PASSWORD,
      database: process.env.DDBB_DATABASE,
      entities: [GenericEntity],
      synchronize: true,
    }),
    EntityModule,
  ],
  providers: []
})
export class AppModule {}
