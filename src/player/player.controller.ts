import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { PlayerDto } from './dtos/player.dto';

@ApiTags('players')
@Controller('api/players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  @ApiOkResponse({
    description: 'La lista fue consultada con exito.',
    type: PlayerDto,
  })
  @ApiOperation({
    summary: 'Devuelve una lista de jugadores',
    description: 'Devuelve una lista de todos los jugadores. Si no hay jugadores devuelve una lista vacia',
  })
  getPlayers(): Promise<PlayerDto[]> {
    return this.playerService.getPlayers();
  }

  @Get(':playerId')
  @ApiOkResponse({
    description: 'Devuelve un jugador filtrado por id.',
    type: PlayerDto,
  })
  @ApiOperation({
    summary: 'Devuelve el jugador',
    description: 'Devuelve el jugador',
  })
  async getPlayerById(@Param('playerId') playerId: number): Promise<PlayerDto> {
    return this.playerService.getPlayersById(playerId);
  }

}
