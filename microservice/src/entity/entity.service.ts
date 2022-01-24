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
  
  createNewEntity = ( newEntity : GenericEntity) => {
    this.genericEntityRepository.save([newEntity])
  }
  
  editEntityById(entityId: number, entityDto: GenericEntity) {
    this.genericEntityRepository.update(entityId,entityDto)
  }

  deleteEntityById = ( entityId : number) => {
    this.genericEntityRepository.delete(entityId)
  }

}
