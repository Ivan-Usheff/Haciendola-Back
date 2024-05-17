import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { LoggerModule } from 'utils/logger/logger.module';
import { DATA_SOURCE } from './data-source';
import { ENTITIES } from './entities';
import { UsersSubscriber } from './events/users.suscriber';
import { DataBaseService } from './database.service';
import { CsvModule } from 'nest-csv-parser'

const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    imports: [ConfigModule, LoggerModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        name: 'database',
        type: 'postgres',
        url: configService.get('POSTGRES_URL'),
        entities: [...ENTITIES],
        synchronize: true,
        subscribers: [UsersSubscriber],
        // logging: true,
        // logger: new CustomQueryLogger()
      });

      return dataSource.initialize();
    },
  },
];

@Module({
  imports: [
    CsvModule,
    LoggerModule
  ],
  providers: [
    ...databaseProviders, 
    ...DATA_SOURCE,
    DataBaseService
  ],
  exports: [
    ...databaseProviders,
    ...DATA_SOURCE,
    DataBaseService
  ],
})
export class DatabaseModule { }