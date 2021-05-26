import { CacheModule, Module } from '@nestjs/common';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericEntity } from './entities/generic-entity.entity';
import { Repository } from 'typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
//import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([GenericEntity]),
    Repository,
    CacheModule.register()
  /*   CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }) */
    ,
    ClientsModule.register([
      { name: 'ENTITY_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [EntityController],
  providers: [
    EntityService,
  ],
})
export class EntityModule {}
