import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    Repository,
    CacheModule.register()
  ],
  controllers: [PlayerController],
  providers: [
    PlayerService,
  ],
})
export class PlayerModule {}
