import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamVisit, VisitStatus } from './team-visit.entity';
import { TeamVisitMember } from './team-visit-member.entity';
import { NotificationsService } from '../notifications/notifications.service';

export interface MemberDto {
    userId: string;
    userName: string;
    userRole?: string;
}

@Injectable()
export class TeamVisitsService {
    constructor(
        @InjectRepository(TeamVisit)
        private visitRepository: Repository<TeamVisit>,
        @InjectRepository(TeamVisitMember)
        private memberRepository: Repository<TeamVisitMember>,
        private notificationsService: NotificationsService,
    ) { }

    async findAll() {
        return this.visitRepository.find({
            relations: ['members'],
            order: { scheduledDate: 'ASC' },
        });
    }

    async findById(id: string) {
        return this.visitRepository.findOne({
            where: { id },
            relations: ['members'],
        });
    }

    async create(dto: Partial<TeamVisit>, userId: string, userName: string) {
        const visit = this.visitRepository.create({
            ...dto,
            createdById: userId,
            createdByName: userName,
            status: VisitStatus.PENDING,
        });
        return this.visitRepository.save(visit);
    }

    async assign(id: string, members: MemberDto[], creatorId: string) {
        // Remove existing members for this visit
        await this.memberRepository.delete({ teamVisitId: id });

        // Insert new members
        if (members.length > 0) {
            const newMembers = members.map(m =>
                this.memberRepository.create({
                    teamVisitId: id,
                    userId: m.userId,
                    userName: m.userName,
                    userRole: m.userRole || '',
                })
            );
            await this.memberRepository.save(newMembers);

            // Update status and legacy assignedTo fields (first member as primary)
            const first = members[0];
            await this.visitRepository.update(id, {
                assignedToId: first.userId,
                assignedToName: members.map(m => m.userName).join(', '),
                status: VisitStatus.ASSIGNED,
            });

            // Send notifications to all assigned members
            for (const m of members) {
                await this.notificationsService.create(
                    m.userId,
                    `Anda telah ditunjuk untuk melakukan Team Visit. Silakan cek jadwal Anda.`,
                    '/team',
                );
            }
        } else {
            // Un-assign
            await this.visitRepository.update(id, {
                assignedToId: undefined,
                assignedToName: undefined,
                status: VisitStatus.PENDING,
            });
        }

        return this.findById(id);
    }

    async update(id: string, dto: Partial<TeamVisit>) {
        await this.visitRepository.update(id, dto);
        return this.findById(id);
    }

    async delete(id: string) {
        await this.visitRepository.delete(id);
        return { message: 'Team visit deleted' };
    }
}
