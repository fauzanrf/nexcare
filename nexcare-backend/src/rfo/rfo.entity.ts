import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Client } from '../clients/client.entity';
import { User } from '../users/user.entity';

export enum RFOStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
}

export enum RFOCategory {
    HARD = 'Hard',
    NORMAL = 'Normal',
    EASY = 'Easy',
}

export enum TicketStatus {
    OPEN = 'Open',
    CLOSE = 'Close',
}

@Entity('rfos')
export class RFO {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'rfo_number', length: 50, unique: true })
    rfoNumber: string;

    @ManyToOne(() => Client, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ name: 'client_id', nullable: true })
    clientId: string;

    @Column({ name: 'client_name', length: 150 })
    clientName: string;

    @Column({ name: 'cid_iw', length: 50, nullable: true })
    cidIw: string;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @Column({ name: 'created_by', nullable: true })
    createdById: string;

    @Column({ name: 'created_by_name', length: 100, nullable: true })
    createdByName: string;

    @Column({ name: 'incident_date', type: 'date' })
    incidentDate: string;

    @Column({ name: 'incident_hour', length: 50, nullable: true })
    incidentHour: string;

    @Column({ name: 'duration_minutes', type: 'int', default: 0 })
    durationMinutes: number;

    @Column({ name: 'impacted_sla', type: 'boolean', default: false })
    impactedSla: boolean;

    @Column({ type: 'enum', enum: RFOCategory, default: RFOCategory.NORMAL })
    category: RFOCategory;

    @Column({ name: 'status_ticket', type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
    statusTicket: TicketStatus;

    @Column({ type: 'enum', enum: RFOStatus, default: RFOStatus.PENDING })
    status: RFOStatus;

    @Column({ name: 'incident_description', type: 'longtext', nullable: true })
    incidentDescription: string;

    @Column({ name: 'root_cause', type: 'longtext', nullable: true })
    rootCause: string;

    @Column({ name: 'action_taken', type: 'longtext', nullable: true })
    actionTaken: string;

    @Column({ name: 'approved_by', nullable: true })
    approvedById: string;

    @Column({ name: 'approved_at', type: 'datetime', nullable: true })
    approvedAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
