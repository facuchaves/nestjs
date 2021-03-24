import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
    isArray: true
  })
  @ApiOperation({
    summary: 'Devuelve una lista de jugadores',
    description: 'Devuelve una lista de todos los jugadores. Si no hay jugadores devuelve una lista vacia',
  })
  getAllPlayers(): Promise<PlayerDto[]> {
    return this.playerService.getAllPlayers();
  }

  @Get(':playerId')
  @ApiOkResponse({
    description: 'Devuelve un jugador filtrado por id.',
    type: PlayerDto,
  })
  @ApiNotFoundResponse({
    description: 'Si no existe el usuario que se busco, lanzo un not found.',
  })
  @ApiOperation({
    summary: 'Devuelve el jugador',
    description: 'Devuelve el jugador',
  })
  async getPlayerById( @Param('playerId' , ParseIntPipe ) playerId: number ): Promise<PlayerDto> {
    return this.playerService.getPlayersById(playerId);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    description: 'Si un parametro no cumple con la especificacion.',
  })
  @ApiOperation({
    summary: 'Creacion de jugador',
    description: 'Crea un jugador.',
  })
  async createPlayer(
    @Body() playerDto: PlayerDto
    ) {
    return this.playerService.createNewPlayer(playerDto);
  }

  @Put(':playerId')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: 'Si el user con ese id no existe.',
  })
  @ApiOperation({
    summary: 'Eliminacion de jugador',
    description: 'Elimina un jugador.',
  })
  async editPlayer(
    @Param('playerId') playerId: number,
    @Body() playerDto: PlayerDto
    ) {
    return this.playerService.editPlayerById(playerId,playerDto);
  }

  @Delete(':playerId')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: 'Si e; user con ese id no existe.',
  })
  @ApiOperation({
    summary: 'Eliminacion de jugador',
    description: 'Elimina un jugador.',
  })
  async deletePlayer(
    @Param('playerId') playerId: number
    ) {
    return this.playerService.deletePlayerById(playerId);
  }

}
