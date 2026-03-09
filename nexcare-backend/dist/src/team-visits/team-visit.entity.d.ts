import { User } from '../users/user.entity';
import { TeamVisitMember } from './team-visit-member.entity';
export declare enum VisitStatus {
    PENDING = "pending",
    ASSIGNED = "assigned",
    DONE = "done"
}
export declare class TeamVisit {
    id: string;
    title: string;
    notes: string;
    scheduledDate: string;
    scheduledTime: string;
    location: string;
    assignedTo: User;
    assignedToId: string;
    assignedToName: string;
    createdBy: User;
    createdById: string;
    createdByName: string;
    status: VisitStatus;
    members: TeamVisitMember[];
    createdAt: Date;
    updatedAt: Date;
}
