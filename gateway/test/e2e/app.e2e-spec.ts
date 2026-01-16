import { Test, TestingModule } from '@nestjs/testing';
import { CacheInterceptor, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  ENTITY_MICROSERVICE_LOCAL_NAME,
  ENTITY_MICROSERVICE_NAME,
} from '../../src/entity/entity.constans';
import { of, throwError } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const entityClientMock = {
    send: jest.fn(),
  };

  const localEntityClientMock = {
    send: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideInterceptor(CacheInterceptor)
      .useValue({
        intercept: (_ctx, next) => next.handle(), // 🔥 bypass total
      })
      .overrideProvider(ENTITY_MICROSERVICE_NAME)
      .useValue(entityClientMock)
      .overrideProvider(ENTITY_MICROSERVICE_LOCAL_NAME)
      .useValue(localEntityClientMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(); // sin cache
    await app.init();
  });

  describe('/api/resource', () => {
    describe('GET', () => {
      beforeEach(() => {
        entityClientMock.send.mockReset();
        localEntityClientMock.send.mockReset();
      });

      it('it should return 200 code', async () => {
        entityClientMock.send.mockReturnValueOnce(
          of([{ id: 1, name: 'test entity', score: 1 }]),
        );
        await request(app.getHttpServer()).get('/api/resource').expect(200);
      });

      it('it should return correct body)', async () => {
        entityClientMock.send.mockReturnValueOnce(
          of([{ id: 1, name: 'test entity', score: 10 }]),
        );
        const response = await request(app.getHttpServer()).get(
          '/api/resource',
        );
        await expect(response.body).toEqual([
          { id: 1, name: 'test entity', score: 10 },
        ]);
      });
    });

    describe('POST', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it('it should return 201 code', async () => {
        entityClientMock.send.mockReturnValueOnce(of({ id: 1 }));
        await request(app.getHttpServer())
          .post('/api/resource')
          .send({
            id: 0,
            name: 'Rebeca',
            score: 67,
          })
          .expect(201);
      });

      it('it should return 400 on bad params)', async () => {
        await request(app.getHttpServer())
          .post('/api/resource')
          .send({})
          .expect(400);
      });
    });
  });
});
