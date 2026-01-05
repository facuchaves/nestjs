import { Injectable } from '@nestjs/common';
import { GenericEntity } from './entities/generic-entity.entity';
import { GenericEntityRepository } from './entity.repository';
import { EntityDto } from './dtos/entity.dto';
import { CreateGenericEntityDto } from './dtos/create-generic-entity.dto';
import { UpdateGenericEntityDto } from './dtos/update-generic-entity.dto';
import { UpdateGenericEntityResponseDto } from './dtos/update-generic-entity.response.dto';
import { CreateGenericEntityResponseDto } from './dtos/create-generic-entity.response.dto';
import { DeleteGenericEntityResponseDto } from './dtos/delete-generic-entity.response.dto';

@Injectable()
export class EntityService {
  constructor(private genericEntityRepository: GenericEntityRepository) {}

  async getAllEntities(): Promise<EntityDto[]> {
    return (await this.genericEntityRepository.find()).map((entity) => ({
      id: entity.entity_id,
      name: entity.name,
      score: entity.score,
    }));
  }

  async getEntityById(entityIdToSearch: number): Promise<EntityDto> {
    const allEntities = await this.getAllEntities();
    return allEntities.find((entity) => entity.id == entityIdToSearch);
  }

  async createNewEntity(
    newEntity: CreateGenericEntityDto,
  ): Promise<CreateGenericEntityResponseDto> {
    const res = await this.genericEntityRepository.insert(newEntity);
    return { id: res.identifiers[0].entity_id };
  }

  async editEntityById(
    entityId: number,
    entityDto: UpdateGenericEntityDto,
  ): Promise<UpdateGenericEntityResponseDto> {
    const res = await this.genericEntityRepository.update(entityId, entityDto);
    return { updated: res?.affected > 0 };
  }

  async deleteEntityById(
    entityId: number,
  ): Promise<DeleteGenericEntityResponseDto> {
    const res = await this.genericEntityRepository.delete(entityId);
    return { deleted: res?.affected > 0 };
  }
}
