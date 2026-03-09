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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rfo_entity_1 = require("../rfo/rfo.entity");
const starlink_account_entity_1 = require("../clients/starlink-account.entity");
const team_visit_entity_1 = require("../team-visits/team-visit.entity");
let DashboardService = class DashboardService {
    rfoRepository;
    starlinkRepository;
    visitRepository;
    constructor(rfoRepository, starlinkRepository, visitRepository) {
        this.rfoRepository = rfoRepository;
        this.starlinkRepository = starlinkRepository;
        this.visitRepository = visitRepository;
    }
    async getStats() {
        const rfoPending = await this.rfoRepository.count({ where: { status: rfo_entity_1.RFOStatus.PENDING } });
        const rfoApproved = await this.rfoRepository.count({ where: { status: rfo_entity_1.RFOStatus.APPROVED } });
        const starlinkActive = await this.starlinkRepository.count({ where: { status: 'Active' } });
        const starlinkSuspend = await this.starlinkRepository.count({ where: { status: 'Suspend' } });
        const today = new Date().toISOString().split('T')[0];
        const upcomingVisits = await this.visitRepository.find({
            where: [],
            order: { scheduledDate: 'ASC' },
            take: 5,
        });
        return {
            rfoPending,
            rfoApproved,
            starlinkActive,
            starlinkSuspend,
            upcomingVisits,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rfo_entity_1.RFO)),
    __param(1, (0, typeorm_1.InjectRepository)(starlink_account_entity_1.StarlinkAccount)),
    __param(2, (0, typeorm_1.InjectRepository)(team_visit_entity_1.TeamVisit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map