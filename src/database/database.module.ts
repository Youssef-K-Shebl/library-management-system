import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from '../config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvConfigService],
      useFactory: (envConfig: EnvConfigService) => ({
        type: 'postgres',
        host: envConfig.dbHost,
        port: envConfig.dbPort,
        username: envConfig.dbUsername,
        password: envConfig.dbPassword,
        database: envConfig.dbName,
        autoLoadEntities: true,
        synchronize: false,
        migrations: ['dist/database/migrations/*.js'],
      }),
    }),
  ],
})
export class DatabaseModule {}
