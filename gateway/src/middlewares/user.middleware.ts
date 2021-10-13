import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserMiddleware');
    req['user'] = { name: "UserNameReq" }
    res['user'] = { name: "UserNameRes" }
    next();
  }
}
