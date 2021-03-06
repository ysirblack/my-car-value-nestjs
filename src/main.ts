import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require("cookie-session"); //doesn't work with import 
import {setupApp} from "../src/setup-app";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  //we could comment below and just execute newly created function here
  //todo setupApp(app);

 /*  app.use(cookieSession({
    keys: ["asdasdasd"]//set whatever you want, it will be used in the cookie for encryption
  })); */
  /* app.useGlobalPipes(//for DTOs //moved to app.module! for e2e
    new ValidationPipe({
      whitelist: true,//for a security reason, users can't submit
      //another key value other than we set, like email and password.We just
      //want these two.
    }), 
  );  */

  await app.listen(3000);
}

bootstrap();
