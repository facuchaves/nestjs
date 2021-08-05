import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericEntity } from './entities/generic-entity.entity';
import { GenericEntityRepository } from './entity.repository';

@Injectable()
export class EntityService {
  
  constructor(
    // @InjectRepository(GenericEntityRepository)
    // private genericEntityRepository: any, //GenericEntityRepository,
    ) {}
    
  getAllEntities(): Promise<GenericEntity[]> {
    return new Promise((resolve, reject) => {
      resolve([{id:  1 , name: 'Jose Microservicio aislado' , score: 99}]);
   });
    // return new Promise( () => ([]) )
    // return this.genericEntityRepository.find()
  }
  
  async getEntityById(entityIdToSearch : number): Promise<GenericEntity> {
    const allEntities = await this.getAllEntities()
    return allEntities.find( entity => entity.id == entityIdToSearch)
  }
  
  createNewEntity = ( newEntity : GenericEntity) => {
    // this.genericEntityRepository.save([newEntity])
  }
  
  editEntityById(entityId: number, entityDto: GenericEntity) {
    // this.genericEntityRepository.update(entityId,entityDto)
  }

  deleteEntityById = ( entityId : number) => {
    // this.genericEntityRepository.delete(entityId)
  }

}
