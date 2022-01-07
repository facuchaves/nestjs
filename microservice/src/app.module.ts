import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericEntity } from './entity/entities/generic-entity.entity';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '3.15.43.176',
      username: 'mysqluser',
      password: 'MYsql1234!!',
      database: 'mysql',
      entities: [GenericEntity],
      synchronize: true,
    }),
    EntityModule,
  ],
  providers: []
})
export class AppModule {}
