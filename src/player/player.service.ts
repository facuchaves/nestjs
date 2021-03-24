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
    
    getAllPlayers(): Promise<Player[]> {
      return this.playerRepository.find()
    }
    
    async getPlayersById(playerIdToSearch : number): Promise<PlayerDto> {
      const players = await this.getAllPlayers()
      return players.find( player => player.id == playerIdToSearch)
    }
    
    createNewPlayer = ( playerDto : PlayerDto) => {
      const newPlayer = {...playerDto} as Player
      this.playerRepository.save([newPlayer])
    }
    
    editPlayerById(playerId: number, playerDto: PlayerDto) {
      this.playerRepository.update(playerId,playerDto)
    }
  
  deletePlayerById = ( playerId : number) => {
    this.playerRepository.delete(playerId)
  }

}
