import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { TeamVisit } from './team-visit.entity';
import { User } from '../users/user.entity';

@Entity('team_visit_members')
export class TeamVisitMember {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => TeamVisit, (visit) => visit.members, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'team_visit_id' })
    teamVisit: TeamVisit;

    @Column({ name: 'team_visit_id' })
    teamVisitId: string;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'user_id', nullable: true })
    userId: string;

    @Column({ name: 'user_name', length: 100 })
    userName: string;

    @Column({ name: 'user_role', length: 50, nullable: true })
    userRole: string;

    @CreateDateColumn({ name: 'assigned_at' })
    assignedAt: Date;
}
