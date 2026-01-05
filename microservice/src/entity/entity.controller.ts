import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntityService } from './entity.service';
import { EntityDto } from './dtos/entity.dto';
import { CreateGenericEntityDto } from './dtos/create-generic-entity.dto';
import { CreateGenericEntityResponseDto } from './dtos/create-generic-entity.response.dto';
import { UpdateGenericEntityDto } from './dtos/update-generic-entity.dto';
import { UpdateGenericEntityResponseDto } from './dtos/update-generic-entity.response.dto';
import { DeleteGenericEntityResponseDto } from './dtos/delete-generic-entity.response.dto';

@Controller('api')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @MessagePattern({ cmd: 'get_all_entities' })
  getAllEntities(): Promise<EntityDto[]> {
    //const value = this.cacheManager.get('entities');
    return this.entityService.getAllEntities();
  }

  @MessagePattern({ cmd: 'get_entity_by_id' })
  async getEntityById(entityId: number): Promise<EntityDto> {
    return this.entityService.getEntityById(entityId);
  }

  @MessagePattern({ cmd: 'create_entity' })
  async createEntity(
    @Payload() entityParam: CreateGenericEntityDto,
  ): Promise<CreateGenericEntityResponseDto> {
    return this.entityService.createNewEntity(entityParam);
  }

  @MessagePattern({ cmd: 'edit_entity' })
  async editEntity(
    @Payload() data: { entityId: number; entityParam: UpdateGenericEntityDto },
  ): Promise<UpdateGenericEntityResponseDto> {
    const { entityId, entityParam } = data;
    return this.entityService.editEntityById(entityId, entityParam);
  }

  @MessagePattern({ cmd: 'delete_entity_by_id' })
  async deleteEntity(
    entityId: number,
  ): Promise<DeleteGenericEntityResponseDto> {
    return this.entityService.deleteEntityById(entityId);
  }
}
