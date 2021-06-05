import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericEntity } from './entity/entities/generic-entity.entity';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '34.71.146.188',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [GenericEntity],
      synchronize: true,
      socketPath:'/cloudsql/nodejs-nest:us-central1:generic-bbdd'
    }),
    EntityModule,
    CacheModule.register()
  ],
  providers: []
})
export class AppModule {}
