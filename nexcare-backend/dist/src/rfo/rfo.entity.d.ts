import { Client } from '../clients/client.entity';
import { User } from '../users/user.entity';
export declare enum RFOStatus {
    PENDING = "pending",
    APPROVED = "approved"
}
export declare enum RFOCategory {
    HARD = "Hard",
    NORMAL = "Normal",
    EASY = "Easy"
}
export declare enum TicketStatus {
    OPEN = "Open",
    CLOSE = "Close"
}
export declare class RFO {
    id: string;
    rfoNumber: string;
    client: Client;
    clientId: string;
    clientName: string;
    cidIw: string;
    createdBy: User;
    createdById: string;
    createdByName: string;
    incidentDate: string;
    incidentHour: string;
    durationMinutes: number;
    impactedSla: boolean;
    category: RFOCategory;
    statusTicket: TicketStatus;
    status: RFOStatus;
    incidentDescription: string;
    rootCause: string;
    actionTaken: string;
    approvedById: string;
    approvedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
