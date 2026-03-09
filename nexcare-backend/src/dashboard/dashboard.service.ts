import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RFO, RFOStatus } from '../rfo/rfo.entity';
import { StarlinkAccount } from '../clients/starlink-account.entity';
import { TeamVisit } from '../team-visits/team-visit.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(RFO)
        private rfoRepository: Repository<RFO>,
        @InjectRepository(StarlinkAccount)
        private starlinkRepository: Repository<StarlinkAccount>,
        @InjectRepository(TeamVisit)
        private visitRepository: Repository<TeamVisit>,
    ) { }

    async getStats() {
        const rfoPending = await this.rfoRepository.count({ where: { status: RFOStatus.PENDING } });
        const rfoApproved = await this.rfoRepository.count({ where: { status: RFOStatus.APPROVED } });
        const starlinkActive = await this.starlinkRepository.count({ where: { status: 'Active' } });
        const starlinkSuspend = await this.starlinkRepository.count({ where: { status: 'Suspend' } });

        const today = new Date().toISOString().split('T')[0];
        const upcomingVisits = await this.visitRepository.find({
            where: [],
            order: { scheduledDate: 'ASC' },
            take: 5,
        });

        return {
            rfoPending,
            rfoApproved,
            starlinkActive,
            starlinkSuspend,
            upcomingVisits,
        };
    }
}
