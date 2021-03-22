import { Controller, Get } from '@nestjs/common';
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
  
  getPlayers(): PlayerDto[] {
    return this.playerService.getPlayers();
  }

}
