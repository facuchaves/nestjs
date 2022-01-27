import { Injectable } from '@nestjs/common';
import { GenericEntity } from './entities/generic-entity.entity';
import { GenericEntityRepository } from './entity.repository';

@Injectable()
export class EntityService {
  
  constructor(
    private genericEntityRepository: GenericEntityRepository,
    ) {}
    
  getAllEntities(): Promise<GenericEntity[]> {
    return this.genericEntityRepository.find()
  }
  
  async getEntityById(entityIdToSearch : number): Promise<GenericEntity> {
    const allEntities = await this.getAllEntities()
    return allEntities.find( entity => entity.entity_id == entityIdToSearch)
  }
  
  createNewEntity = async ( newEntity : GenericEntity) => {
    return await this.genericEntityRepository.insert(newEntity)
  }
  
  editEntityById = async (entityId: number, entityDto: GenericEntity) => {
    return await this.genericEntityRepository.update(entityId,entityDto)
  }

  deleteEntityById = async ( entityId : number) => {
    return await this.genericEntityRepository.delete(entityId)
  }

}
