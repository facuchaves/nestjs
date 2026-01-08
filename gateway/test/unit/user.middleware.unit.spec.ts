import { UserMiddleware } from '../../src/middlewares/user.middleware';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

describe('User middleware', () => {
  const userMiddleware: UserMiddleware = new UserMiddleware(new Logger());
  describe('Happy paths', () => {
    it(`fill req`, async () => {
      const req = {
        headers: {
          token: '{ "name": "UserNameReq" }',
        },
      };

      userMiddleware.use(req as any, {} as Response, () => {});

      expect(req['user']).toStrictEqual({ name: 'UserNameReq' });
    });

    it(`fill res`, async () => {
      const res: Response = {} as Response;

      userMiddleware.use({ headers: {} } as Request, res, () => {});

      expect(res['user']).toStrictEqual({ name: 'UserNameRes' });
    });

    it(`call nest()`, async () => {
      const mockedObject = {
        mockedMethod: () => {},
      };

      const funtionSpies = jest.spyOn(mockedObject, 'mockedMethod');

      const nextFunction: NextFunction = (() =>
        mockedObject.mockedMethod()) as NextFunction;

      userMiddleware.use(
        { headers: {} } as Request,
        {} as Response,
        nextFunction,
      );

      expect(funtionSpies).toBeCalledTimes(1);
    });
  });
});
