import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerDto } from './dtos/player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  getPlayers(): PlayerDto[] {
    const mockPlayers = [{
      name: 'Pablo',
      score: 55,
    }]

    const players = this.playerRepository.find()

    return mockPlayers;
  }
}
