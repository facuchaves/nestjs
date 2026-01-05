import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EntityDto } from './dtos/entity.dto';
import { GenericEntity } from './entities/generic-entity.entity';
import {
  ENTITY_MICROSERVICE_LOCAL_NAME,
  ENTITY_MICROSERVICE_NAME,
} from './entity.constans';

@Injectable()
export class EntityService {
  constructor(
    @Inject(ENTITY_MICROSERVICE_NAME) private client: ClientProxy,
    @Inject(ENTITY_MICROSERVICE_LOCAL_NAME) private localClient: ClientProxy,
  ) {}

  async getAllEntitiesLocal(): Promise<GenericEntity[]> {
    const pattern = { cmd: 'get_all_entities' };
    return this.localClient.send<GenericEntity[]>(pattern, {}).toPromise();
  }

  async getAllEntities(): Promise<GenericEntity[]> {
    const pattern = { cmd: 'get_all_entities' };
    return this.client.send<GenericEntity[]>(pattern, {}).toPromise();
  }

  async getEntityById(entityIdToSearch: number): Promise<EntityDto> {
    const pattern = { cmd: 'get_entity_by_id' };
    return this.client
      .send<GenericEntity>(pattern, entityIdToSearch)
      .toPromise();
  }

  createNewEntity = (entityDto: EntityDto) => {
    const pattern = { cmd: 'create_entity' };
    return this.client.send<GenericEntity[]>(pattern, entityDto).toPromise();
  };

  editEntityById(entityId: number, entityDto: EntityDto) {
    const pattern = { cmd: 'edit_entity' };
    const payload = { entityId: entityId, entityParam: entityDto };
    return this.client.send<GenericEntity[]>(pattern, payload).toPromise();
  }

  deleteEntityById = (entityIdToDelete: number) => {
    const pattern = { cmd: 'delete_entity_by_id' };
    return this.client
      .send<GenericEntity[]>(pattern, entityIdToDelete)
      .toPromise();
  };
}
