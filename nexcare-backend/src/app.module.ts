import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { RFOModule } from './rfo/rfo.module';
import { TeamVisitsModule } from './team-visits/team-visits.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { User } from './users/user.entity';
import { Client } from './clients/client.entity';
import { ISPVendor } from './clients/isp-vendor.entity';
import { StarlinkAccount } from './clients/starlink-account.entity';
import { RFO } from './rfo/rfo.entity';
import { TeamVisit } from './team-visits/team-visit.entity';
import { TeamVisitMember } from './team-visits/team-visit-member.entity';
import { Notification } from './notifications/notification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: config.get<number>('DB_PORT') || 3306,
        username: config.get<string>('DB_USER') || 'root',
        password: config.get<string>('DB_PASS') || '',
        database: config.get<string>('DB_NAME') || 'nexcare_db',
        entities: [User, Client, ISPVendor, StarlinkAccount, RFO, TeamVisit, TeamVisitMember, Notification],
        synchronize: true, // DEVELOPMENT ONLY — disables in production
        logging: false,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    UsersModule,
    ClientsModule,
    RFOModule,
    TeamVisitsModule,
    NotificationsModule,
    DashboardModule,
  ],
})
export class AppModule { }
