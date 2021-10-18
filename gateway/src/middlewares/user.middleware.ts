import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserMiddleware');
    if ( req.headers['token'] ){
      req['user'] = JSON.parse( req.headers['token'] as string )
    }
    res['user'] = { name: "UserNameRes" }
    
    next();
  }
}
