import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'node:console';
import { Repository } from 'typeorm';
import { GenericEntity } from './entities/generic-entity.entity';

@Injectable()
export class EntityService {
  
  constructor(
    @InjectRepository(GenericEntity)
    private genericEntityRepository: Repository<GenericEntity>,
    ) {}
    
  getAllEntities(): Promise<GenericEntity[]> {
    return this.genericEntityRepository.find()
  }
  
  async getEntityById(entityIdToSearch : number): Promise<GenericEntity> {
    const allEntities = await this.getAllEntities()
    return allEntities.find( entity => entity.id == entityIdToSearch)
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
