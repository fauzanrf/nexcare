import { TeamVisit } from './team-visit.entity';
import { User } from '../users/user.entity';
export declare class TeamVisitMember {
    id: string;
    teamVisit: TeamVisit;
    teamVisitId: string;
    user: User;
    userId: string;
    userName: string;
    userRole: string;
    assignedAt: Date;
}
