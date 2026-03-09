import { Repository } from 'typeorm';
import { TeamVisit } from './team-visit.entity';
import { TeamVisitMember } from './team-visit-member.entity';
import { NotificationsService } from '../notifications/notifications.service';
export interface MemberDto {
    userId: string;
    userName: string;
    userRole?: string;
}
export declare class TeamVisitsService {
    private visitRepository;
    private memberRepository;
    private notificationsService;
    constructor(visitRepository: Repository<TeamVisit>, memberRepository: Repository<TeamVisitMember>, notificationsService: NotificationsService);
    findAll(): Promise<TeamVisit[]>;
    findById(id: string): Promise<TeamVisit | null>;
    create(dto: Partial<TeamVisit>, userId: string, userName: string): Promise<TeamVisit>;
    assign(id: string, members: MemberDto[], creatorId: string): Promise<TeamVisit | null>;
    update(id: string, dto: Partial<TeamVisit>): Promise<TeamVisit | null>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
