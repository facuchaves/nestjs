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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [GenericEntity],
      synchronize: true,
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
