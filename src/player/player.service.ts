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

  getPlayers(): Promise<Player[]> {
    return this.playerRepository.find()
  }

  async getPlayersById(playerIdToSearch : number): Promise<PlayerDto> {
    const players = await this.getPlayers()
    return players.find( player => player.id == playerIdToSearch)
  }

}
