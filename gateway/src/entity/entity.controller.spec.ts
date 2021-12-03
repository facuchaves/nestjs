import { INestApplication } from '@nestjs/common';
import { ClientProxy, ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { EntityDto } from './dtos/entity.dto';
import { GenericEntity } from './entities/generic-entity.entity';
import { EntityController } from './entity.controller';
import { EntityModule } from './entity.module';
import { EntityService } from './entity.service';
import * as request from 'supertest';

describe('Entity controller', () => {

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports:[EntityModule],
    })
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  // afterEach( () => {
  //   jest.clearAllMocks();
  // })

  describe('Happy paths', () => {

    it(`/GET resources: should retunr all resources`, async () => {
      return request(app.getHttpServer())
        .get('/api/resource')
        .expect(200)
        // .expect(await entityService.getAllEntities(),
        // );
    });
    
  });

  afterAll(async () => {
    await app.close();
  });

});
