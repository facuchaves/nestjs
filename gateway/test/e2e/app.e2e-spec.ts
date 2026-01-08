import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/api/resource', () => {
    describe('GET', () => {
      it('it should return 200 code', async () => {
        await request(app.getHttpServer()).get('/api/resource').expect(200);
      });

      it('it should return correct body)', async () => {
        const response = await request(app.getHttpServer()).get(
          '/api/resource',
        );
        await expect(response.body).toEqual([
          {
            id: 1,
            name: 'Nombre',
            score: 30,
          },
        ]);
      });
    });

    describe('POST', () => {
      it('it should return 201 code', async () => {
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
        request(app.getHttpServer()).post('/api/resource').send({}).expect(400);
      });
    });
  });
});
