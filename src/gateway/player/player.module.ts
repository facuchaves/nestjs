import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
//import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    Repository,
    CacheModule.register()
  /*   CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }) */
  ],
  controllers: [PlayerController],
  providers: [
    PlayerService,
  ],
})
export class PlayerModule {}
