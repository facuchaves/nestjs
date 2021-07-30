import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericEntity } from './entity/entities/generic-entity.entity';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '10.24.80.4',//'34.71.146.188',
    //   extra: {
    //        socketPath: '/cloudsql/nodejs-nest:us-central1:generic-bbdd'
    //   },
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   entities: [GenericEntity],
    //   synchronize: true,
    // }),
    EntityModule,
    CacheModule.register()
  ],
  providers: []
})
export class AppModule {}
