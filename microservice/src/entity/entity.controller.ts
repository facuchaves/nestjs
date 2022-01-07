import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EntityDto } from './dtos/entity.dto';
import { GenericEntity } from './entities/generic-entity.entity';
import { EntityService } from './entity.service';

@ApiTags('app')
@Controller('api')
export class EntityController {
  getHello(): string {
    return 'Hello World!'
  }
  constructor(private readonly entityService: EntityService) {}

  @MessagePattern({ cmd: 'get_all_entities' })
  getAllEntities(): Promise<GenericEntity[]> {
    //const value = this.cacheManager.get('entities');
    return this.entityService.getAllEntities();
  }

  @MessagePattern({ cmd: 'get_entity_by_id' })
  async getEntityById( entityId: number ): Promise<GenericEntity> {
    return this.entityService.getEntityById(entityId);
  }

  @MessagePattern({ cmd: 'create_entity' })
  async createEntity( @Payload() entityParam: GenericEntity ) {
    return this.entityService.createNewEntity(entityParam);
  }

  @MessagePattern({ cmd: 'edit_entity' })
  async editEntity( @Payload() data : {entityId: number, entityParam: GenericEntity} ) {
    const { entityId , entityParam } = data
    return this.entityService.editEntityById(entityId,entityParam);
  }

  @MessagePattern({ cmd: 'delete_entity_by_id' })
  async deleteEntity( entityId: number ) {
    return this.entityService.deleteEntityById(entityId);
  }

}
