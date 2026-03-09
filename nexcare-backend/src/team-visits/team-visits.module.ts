import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamVisit } from './team-visit.entity';
import { TeamVisitMember } from './team-visit-member.entity';
import { TeamVisitsService } from './team-visits.service';
import { TeamVisitsController } from './team-visits.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [TypeOrmModule.forFeature([TeamVisit, TeamVisitMember]), NotificationsModule],
    providers: [TeamVisitsService],
    controllers: [TeamVisitsController],
    exports: [TeamVisitsService],
})
export class TeamVisitsModule { }
