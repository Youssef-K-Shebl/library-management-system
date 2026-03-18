import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule, EnvConfigService } from './config';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';
import { BorrowersModule } from './borrowers/borrowers.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { ReportsModule } from './reports/reports.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { BasicAuthGuard } from './common/guards/basic-auth.guard';

@Module({
  imports: [
    EnvConfigModule,
    DatabaseModule,
    ThrottlerModule.forRootAsync({
      inject: [EnvConfigService],
      useFactory: (config: EnvConfigService) => [
        {
          ttl: config.throttleTtl * 1000,
          limit: config.throttleLimit,
        },
      ],
    }),
    BooksModule,
    BorrowersModule,
    BorrowingModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: BasicAuthGuard },
  ],
})
export class AppModule {}
