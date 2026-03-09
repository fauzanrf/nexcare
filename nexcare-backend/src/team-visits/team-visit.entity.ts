import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { TeamVisitMember } from './team-visit-member.entity';

export enum VisitStatus {
    PENDING = 'pending',
    ASSIGNED = 'assigned',
    DONE = 'done',
}

@Entity('team_visits')
export class TeamVisit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 200 })
    title: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ name: 'scheduled_date', type: 'date' })
    scheduledDate: string;

    @Column({ name: 'scheduled_time', length: 20, nullable: true })
    scheduledTime: string;

    @Column({ name: 'location', length: 255, nullable: true })
    location: string;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'assigned_to' })
    assignedTo: User;

    @Column({ name: 'assigned_to', nullable: true })
    assignedToId: string;

    @Column({ name: 'assigned_to_name', length: 100, nullable: true })
    assignedToName: string;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @Column({ name: 'created_by', nullable: true })
    createdById: string;

    @Column({ name: 'created_by_name', length: 100, nullable: true })
    createdByName: string;

    @Column({ type: 'enum', enum: VisitStatus, default: VisitStatus.PENDING })
    status: VisitStatus;

    @OneToMany(() => TeamVisitMember, (m) => m.teamVisit, { cascade: true, eager: false })
    members: TeamVisitMember[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
