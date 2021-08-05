import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { EntityDto } from './dtos/entity.dto';
import { GenericEntity } from './entities/generic-entity.entity';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';

describe('Entity service', () => {

  let clientProxy: ClientProxy = { send : (pattern: any, data: any) => (new Observable() ) } as ClientProxy;
  let entityService: EntityService = new EntityService(clientProxy);

  afterEach( () => {
    jest.clearAllMocks();
  })

  describe('Happy paths', () => {

    it('should return all entities', async () => {
      const result : Array<GenericEntity> = [
        {
          id: 1,
          name: 'Nombre',
          score: 78
       }
      ];
      jest.spyOn(entityService, 'getAllEntities').mockImplementation(async () => result );

      expect(await entityService.getAllEntities()).toStrictEqual( result );

      });
    
    it('should return specific entities', async () => {
      const idToFind = 1;

      const clientProxySpies = jest.spyOn(clientProxy, 'send');
      
      entityService.getEntityById(idToFind)
      
      expect(clientProxySpies).toBeCalledTimes(1);
      expect(clientProxySpies).toBeCalledWith({ cmd: 'get_entity_by_id' },idToFind);
    });

    it('should create new entity', async () => {
      const clientProxySpies = jest.spyOn(clientProxy, 'send');

      const entityToCreate : EntityDto = { name: 'Name' , score : 50 };
      entityService.createNewEntity( entityToCreate )
      
      expect(clientProxySpies).toBeCalledTimes(1);
      expect(clientProxySpies).toBeCalledWith({ cmd: 'create_entity' },entityToCreate);
    });

    it('should update entity', async () => {
      const clientProxySpies = jest.spyOn(clientProxy, 'send');

      const entityToUpdate : EntityDto = { name: 'Name' , score : 50 };
      const entityIdToUpdate = 1;
      entityService.editEntityById( entityIdToUpdate , entityToUpdate )
      
      expect(clientProxySpies).toBeCalledTimes(1);
      expect(clientProxySpies).toBeCalledWith({ cmd: 'edit_entity' },{entityId:entityIdToUpdate,entityParam:entityToUpdate});
    });

    it('should delete entity', async () => {
      const clientProxySpies = jest.spyOn(clientProxy, 'send');

      const entityIdToDelete = 1;
      entityService.deleteEntityById( entityIdToDelete )
      
      expect(clientProxySpies).toBeCalledTimes(1);
      expect(clientProxySpies).toBeCalledWith({ cmd: 'delete_entity_by_id' },entityIdToDelete);
    });

  });
});
