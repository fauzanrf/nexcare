"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamVisitsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const team_visit_entity_1 = require("./team-visit.entity");
const team_visit_member_entity_1 = require("./team-visit-member.entity");
const notifications_service_1 = require("../notifications/notifications.service");
let TeamVisitsService = class TeamVisitsService {
    visitRepository;
    memberRepository;
    notificationsService;
    constructor(visitRepository, memberRepository, notificationsService) {
        this.visitRepository = visitRepository;
        this.memberRepository = memberRepository;
        this.notificationsService = notificationsService;
    }
    async findAll() {
        return this.visitRepository.find({
            relations: ['members'],
            order: { scheduledDate: 'ASC' },
        });
    }
    async findById(id) {
        return this.visitRepository.findOne({
            where: { id },
            relations: ['members'],
        });
    }
    async create(dto, userId, userName) {
        const visit = this.visitRepository.create({
            ...dto,
            createdById: userId,
            createdByName: userName,
            status: team_visit_entity_1.VisitStatus.PENDING,
        });
        return this.visitRepository.save(visit);
    }
    async assign(id, members, creatorId) {
        await this.memberRepository.delete({ teamVisitId: id });
        if (members.length > 0) {
            const newMembers = members.map(m => this.memberRepository.create({
                teamVisitId: id,
                userId: m.userId,
                userName: m.userName,
                userRole: m.userRole || '',
            }));
            await this.memberRepository.save(newMembers);
            const first = members[0];
            await this.visitRepository.update(id, {
                assignedToId: first.userId,
                assignedToName: members.map(m => m.userName).join(', '),
                status: team_visit_entity_1.VisitStatus.ASSIGNED,
            });
            for (const m of members) {
                await this.notificationsService.create(m.userId, `Anda telah ditunjuk untuk melakukan Team Visit. Silakan cek jadwal Anda.`, '/team');
            }
        }
        else {
            await this.visitRepository.update(id, {
                assignedToId: undefined,
                assignedToName: undefined,
                status: team_visit_entity_1.VisitStatus.PENDING,
            });
        }
        return this.findById(id);
    }
    async update(id, dto) {
        await this.visitRepository.update(id, dto);
        return this.findById(id);
    }
    async delete(id) {
        await this.visitRepository.delete(id);
        return { message: 'Team visit deleted' };
    }
};
exports.TeamVisitsService = TeamVisitsService;
exports.TeamVisitsService = TeamVisitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_visit_entity_1.TeamVisit)),
    __param(1, (0, typeorm_1.InjectRepository)(team_visit_member_entity_1.TeamVisitMember)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], TeamVisitsService);
//# sourceMappingURL=team-visits.service.js.map