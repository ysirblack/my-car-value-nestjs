import { Injectable , NestMiddleware} from "@nestjs/common";
import { Request, Response, NextFunction} from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";
//this middleware actualy is an interceptor and we would like to assing a currentUser property to coming
//request. Older current-user.interceptor file intercepts after Guard.file so, we would like to know that
//coming request is a user and we verify it here. And admin.guard will check after this middleware, whether
//that user has a admin property true or false.

//todo will be configured in users.module! to make it global middleware

declare global{
  namespace Express{
    interface Request{
      currentUser?: User; //fixed
    }
  }
}



@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService){}

  async use(req: Request, res: Response, next: NextFunction ) {
      const { userId} = req.session || {};
      if(userId) {
        const user= await this.usersService.findOne(userId);
        ///@ts-ignore <--not needed anymore
        req.currentUser = user;//express won't accept currentUser property so will be fixed
      }

      next();//continue with whatever comes next after this middleware

  }
}
