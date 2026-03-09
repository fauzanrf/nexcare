import { Repository } from 'typeorm';
import { RFO } from '../rfo/rfo.entity';
import { StarlinkAccount } from '../clients/starlink-account.entity';
import { TeamVisit } from '../team-visits/team-visit.entity';
export declare class DashboardService {
    private rfoRepository;
    private starlinkRepository;
    private visitRepository;
    constructor(rfoRepository: Repository<RFO>, starlinkRepository: Repository<StarlinkAccount>, visitRepository: Repository<TeamVisit>);
    getStats(): Promise<{
        rfoPending: number;
        rfoApproved: number;
        starlinkActive: number;
        starlinkSuspend: number;
        upcomingVisits: TeamVisit[];
    }>;
}
