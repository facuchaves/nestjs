import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericEntity } from './entities/generic-entity.entity';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';

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
    TypeOrmModule.forFeature([GenericEntity]),
    CacheModule.register(),
    Repository,
    GenericEntity
  ],
  controllers: [EntityController],
  providers: [
    Repository,
    GenericEntity,
    EntityService
  ]
})
export class EntityModule {}
