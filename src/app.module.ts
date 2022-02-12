import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common'; //validation pipe added for e2e test
import { APP_PIPE } from '@nestjs/core'; //added for e2e test
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');

//!nest suggestion for e2e to test fully using our pipes and cookies, these are moved app.module 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
      //synchornize true makes your database table
      //to structure itself automatically when a new column is added
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      //every running traffic thorugh this app, use this pipe
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {//cookie moved here
  configure(consumer: MiddlewareConsumer) {
    //will run every incoming request!
    consumer.apply(
      cookieSession({
        keys: ['asdasdasd'], //set whatever you want, it will be used in the cookie for encryption
      }),
    ).forRoutes("*");//use this middleware on every incoming request that flows (*)(every route)
  }
}
