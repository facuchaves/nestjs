import { Body, CacheInterceptor, CacheKey, CacheTTL, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { EntityService } from './entity.service';
import { EntityDto } from './dtos/entity.dto';
import { MessagePattern } from '@nestjs/microservices';
import { GenericEntity } from './entities/generic-entity.entity';
import { FilterOutputDto } from './dtos/filter-output.dto';
import { FilterPipe } from '../pipes/filter.pipe';
import { FilterInputDto } from './dtos/filter-input.dto';

@ApiTags('resource')
@Controller('api/resource')
@UseInterceptors(CacheInterceptor)
export class EntityController {
  constructor(
    private readonly service: EntityService
    ) {}

  @Get()
  @ApiOkResponse({
    description: 'La lista fue consultada con exito.',
    type: EntityDto,
    isArray: true
  })
  @ApiOperation({
    summary: 'Devuelve una lista de entidades',
    description: 'Devuelve una lista de todos las entidades. Si no hay entidades devuelve una lista vacia',
  })
  @CacheKey('custom_key')
  @CacheTTL(20)
  getAllPlayers(): Promise<EntityDto[]> {
    //const value = this.cacheManager.get('entities');
    return this.service.getAllEntities();
  }

  @Get(':resourceId')
  @ApiParam({name: 'resourceId', required: true, description: 'Entity id to search'})
  @ApiOkResponse({
    description: 'Devuelve un jugador filtrado por id.',
    type: EntityDto,
  })
  @ApiNotFoundResponse({
    description: 'Si no existe el usuario que se busco, lanzo un not found.',
  })
  @ApiOperation({
    summary: 'Devuelve la entidad',
    description: 'Devuelve la entidad',
  })
  async getEntityById( @Param('resourceId' , ParseIntPipe ) entityId: number ): Promise<EntityDto> {
    return this.service.getEntityById(entityId);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    description: 'Si un parametro no cumple con la especificacion.',
  })
  @ApiOperation({
    summary: 'Creacion de entidad',
    description: 'Crea una entidad.',
  })
  async createEntity(
    @Body() entityDto: EntityDto
    ) {
    return this.service.createNewEntity(entityDto);
  }

  @Put(':resourceId')
  @ApiParam({name: 'resourceId', required: true, description: 'Entity id to update'})
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: 'Si el user con ese id no existe.',
  })
  @ApiOperation({
    summary: 'Eliminacion de entidad',
    description: 'Elimina una entidad.',
  })
  async editEntity(
    @Param('resourceId', ParseIntPipe) entityId: number,
    @Body() entityDto: EntityDto
    ) {
    return this.service.editEntityById(entityId,entityDto);
  }

  @Delete(':resourceId')
  @ApiParam({name: 'resourceId', required: true, description: 'Entity id to delete'})
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: 'Si no existe entidad con ese id no existe.',
  })
  @ApiOperation({
    summary: 'Eliminacion de entidad',
    description: 'Elimina un entidad.',
  })
  async deleteEntity(
    @Param('resourceId' , ParseIntPipe) entityId: number
    ) {
    return this.service.deleteEntityById(entityId);
  }

  @MessagePattern({ cmd: 'get_all_entities' })
  getAllEntities(): Promise<GenericEntity[]> {
    //const value = this.cacheManager.get('entities');
    return new Promise((resolve, reject) => {
      resolve([{id:  1 , name: 'Jose Microservicio' , score: 99}]);
   });//this.entityService.getAllEntities();
  }


  @UsePipes(new ValidationPipe({ transform: false }))
  @UsePipes(new FilterPipe())
  @Post('pipe')
  @ApiOkResponse({
    description: 'Devuelve la transformacion hecha por el pipe.',
    type: FilterOutputDto,
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    description: 'Si un parametro no cumple con la especificacion.',
  })
  @ApiOperation({
    summary: 'Uso de pipe de nestjs.',
    description: 'Se usa un custom pipe para validar y transformar.',
  })
  @ApiBody({ type: FilterInputDto })
  async validationAndTranformationPipe( 
    @Body() filterOutputDto: FilterOutputDto
    ) {
      return filterOutputDto;
  }
}
