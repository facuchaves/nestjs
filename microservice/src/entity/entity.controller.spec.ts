import { Test, TestingModule } from '@nestjs/testing';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { GenericEntity } from './entities/generic-entity.entity';
import { EntityDto } from './dtos/entity.dto';

describe.skip('EntityController', () => {
  let controller: EntityController;
  let service: jest.Mocked<EntityService>;
  const mockEntityService = {
    getAllEntities: jest.fn(),
    getEntityById: jest.fn(),
    createNewEntity: jest.fn(),
    editEntityById: jest.fn(),
    deleteEntityById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityController],
      providers: [
        {
          provide: EntityService,
          useValue: mockEntityService,
        },
      ],
    }).compile();

    controller = module.get<EntityController>(EntityController);
    service = module.get(EntityService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all entities', async () => {
    const entities: GenericEntity[] = [
      { entity_id: 1, name: 'nombre 1', score: 10 },
      { entity_id: 2, name: 'nombre 2', score: 20 },
    ];

    service.getAllEntities.mockResolvedValue(
      (entities as unknown) as EntityDto[],
    );

    const result = await controller.getAllEntities();

    expect(service.getAllEntities).toHaveBeenCalledTimes(1);
    expect(result).toEqual(entities);
  });

  it('should return entity by id', async () => {
    const entity = { entity_id: 1, name: 'nombre 1', score: 10 };

    service.getEntityById.mockResolvedValue((entity as unknown) as EntityDto);

    const result = await controller.getEntityById(1);

    expect(service.getEntityById).toHaveBeenCalledWith(1);
    expect(result).toEqual(entity);
  });
});
