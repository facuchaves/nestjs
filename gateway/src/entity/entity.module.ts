import { CacheModule, Logger, Module } from '@nestjs/common';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericEntity } from './entities/generic-entity.entity';
import { Repository } from 'typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ENTITY_MICROSERVICE_NAME } from './entity.constans';
//import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    // TypeOrmModule.forFeature([GenericEntity]),
    //Repository,
    CacheModule.register()
  /*   CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }) */
    ,
    ClientsModule.register([
      { 
        name: ENTITY_MICROSERVICE_NAME, 
        transport: Transport.TCP, 
        options: {
          host : process.env.MICROSERVICE_HOST,
          port: parseInt(process.env.MICROSERVICE_POST),
        } 
    },
    ]),
  ],
  controllers: [EntityController],
    providers: [EntityService,Logger],
})
export class EntityModule {}
