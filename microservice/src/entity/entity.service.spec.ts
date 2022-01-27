import { Test, TestingModule } from '@nestjs/testing';
import { EntityService } from './entity.service';
import { Repository, createConnection, getConnection, getRepository, QueryFailedError } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { GenericEntity } from './entities/generic-entity.entity';

describe('Entity Service', () => {
  let service: EntityService;
  let repository: Repository<GenericEntity>;

  const testConnectionName = 'testConnection';

  beforeEach(async () => {

    await createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [GenericEntity],
        synchronize: true,
        logging: false,
        name: testConnectionName
    });    

    repository = getRepository(GenericEntity, testConnectionName);
    service = new EntityService(repository);

  });

  afterEach(async () => {
    await getConnection(testConnectionName).close()
  });  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Query', () => {

    it('should return specific entity', async () => {
      const entity: GenericEntity = {
        entity_id: 1,
        name: 'Pepe test',
        score: 58
      };
  
      await repository.insert(entity);
  
      expect(await service.getEntityById(1)).toEqual(entity);
    });
  
    it('should return empty list', async () => {
      expect(await service.getAllEntities()).toEqual([]);
    });
  
    it('should return list of entities', async () => {
      const entity: GenericEntity = {
        entity_id: 1,
        name: 'Pepe test',
        score: 58
      };
  
      await repository.insert(entity);
  
      const allEntites = await service.getAllEntities()
  
      expect(allEntites).toHaveLength(1);
      expect(allEntites[0]).toEqual(entity);
    });

  })
  

  describe('Create', () => {

    it('should create new entity', async () => {

      const entity: GenericEntity = {
        entity_id: 1,
        name: 'Pepe test',
        score: 58
      };
  
      await service.createNewEntity(entity)
  
      const allEntites = await repository.query('SELECT * FROM genericentity;')

      expect(allEntites).toHaveLength(1);
      expect(allEntites[0]).toEqual(entity);

    });

    it('should fail trying to create an existing entity', async () => {
      
      const entity: GenericEntity = {
        entity_id: 1,
        name: 'Pepe test',
        score: 58
      };
  
      await repository.insert(entity);

      const reject = await expect( async () => { await service.createNewEntity(entity) } ).rejects
      
      reject.toThrowError(QueryFailedError)
      reject.toThrowError("SQLITE_CONSTRAINT: UNIQUE constraint failed: genericentity.entity_id")

    });

  })

  describe('Update', () => {
    
    it('should update existing entity', async () => {
      const entity: GenericEntity = {
        entity_id: 1,
        name: 'Pepe test',
        score: 58
      };
  
      await repository.insert(entity);
  
      const res = await service.editEntityById(entity.entity_id,{name:'Pepe test editado'} as GenericEntity)
      console.log(res)
      const allEntites = await repository.query('SELECT * FROM genericentity;')

      expect(allEntites).toHaveLength(1);
      expect(allEntites[0].name).toEqual('Pepe test editado');
    });
  
  })

  describe('Delete', () => {

    it('should delete existing entity', async () => {
      const entity: GenericEntity = {
        entity_id: 1,
        name: 'Pepe test',
        score: 58
      };
  
      await repository.insert(entity);
  
      await service.deleteEntityById(entity.entity_id)
  
      const allEntites = await repository.query('SELECT * FROM genericentity;')

      expect(allEntites).toHaveLength(0);
    });

  })

});
