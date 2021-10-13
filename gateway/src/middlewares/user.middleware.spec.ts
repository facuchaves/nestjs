import { UserMiddleware } from './user.middleware';
import { Request, Response, NextFunction } from 'express';

describe('User middleware', () => {

  const userMiddleware : UserMiddleware = new UserMiddleware()
  describe('Happy paths', () => {

    it(`fill req`, async () => {
      const req : Request = {} as Request;
    
      userMiddleware.use(req,{} as Response, () => {})
    
      expect(req['user']).toStrictEqual( { name: "UserNameReq" } );
    });
    
    it(`fill res`, async () => {
      const res : Response = {} as Response;
      
      userMiddleware.use({} as Request,res, () => {})
      // NextFunction
      expect(res['user']).toStrictEqual( { name: "UserNameRes" } );
    });

    it(`call nest()`, async () => {
      const mockedObject = {
        mockedMethod: () => {}
      }

      const funtionSpies = jest.spyOn(mockedObject, 'mockedMethod');

      const nextFunction : NextFunction = ( () => mockedObject.mockedMethod() ) as NextFunction;
      
      userMiddleware.use({} as Request,{} as Response, nextFunction)

      expect(funtionSpies).toBeCalledTimes(1);

    });
  
  })

});
