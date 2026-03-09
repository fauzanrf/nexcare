import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RFO } from '../rfo/rfo.entity';
import { StarlinkAccount } from '../clients/starlink-account.entity';
import { TeamVisit } from '../team-visits/team-visit.entity';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RFO, StarlinkAccount, TeamVisit])],
    providers: [DashboardService],
    controllers: [DashboardController],
})
export class DashboardModule { }
