import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityDto } from './dtos/entity.dto';
import { GenericEntity } from './entities/generic-entity.entity';
import { GenericEntityRepository } from './entity.repository';

@Injectable()
export class EntityService {
  
  constructor(
    @Inject('ENTITY_SERVICE') private client: ClientProxy,
    // @InjectRepository(GenericEntityRepository)
    // private genericEntityRepository: GenericEntityRepository,
    ) {}
  
  async getAllEntities(): Promise<GenericEntity[]> {
    return [{
      id: 1,
      name: 'Nombre',
      score: 78}]
    // const pattern = { cmd: 'get_all_entities' };
    // return this.client.send<GenericEntity[]>(pattern,{}).toPromise();
    // return this.genericEntityRepository.find()
  }
  
  async getEntityById(entityIdToSearch : number): Promise<EntityDto> {
    const pattern = { cmd: 'get_entity_by_id' };
    return this.client.send<GenericEntity>(pattern,entityIdToSearch).toPromise();
  }
  
  createNewEntity = ( entityDto : EntityDto) => {
    const pattern = { cmd: 'create_entity' };
    console.log(entityDto)
    return this.client.send<GenericEntity[]>(pattern,entityDto).toPromise();
  }
  
  editEntityById(entityId: number, entityDto: EntityDto) {
    const pattern = { cmd: 'edit_entity' };
    const payload = {entityId:entityId,entityParam:entityDto};
    return this.client.send<GenericEntity[]>(pattern,payload).toPromise();
  }
  
  deleteEntityById = ( entityIdToDelete : number) => {
    const pattern = { cmd: 'delete_entity_by_id' };
    return this.client.send<GenericEntity[]>(pattern,entityIdToDelete).toPromise();
  }

}
