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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamVisitMember = void 0;
const typeorm_1 = require("typeorm");
const team_visit_entity_1 = require("./team-visit.entity");
const user_entity_1 = require("../users/user.entity");
let TeamVisitMember = class TeamVisitMember {
    id;
    teamVisit;
    teamVisitId;
    user;
    userId;
    userName;
    userRole;
    assignedAt;
};
exports.TeamVisitMember = TeamVisitMember;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TeamVisitMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_visit_entity_1.TeamVisit, (visit) => visit.members, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'team_visit_id' }),
    __metadata("design:type", team_visit_entity_1.TeamVisit)
], TeamVisitMember.prototype, "teamVisit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'team_visit_id' }),
    __metadata("design:type", String)
], TeamVisitMember.prototype, "teamVisitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], TeamVisitMember.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true }),
    __metadata("design:type", String)
], TeamVisitMember.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_name', length: 100 }),
    __metadata("design:type", String)
], TeamVisitMember.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_role', length: 50, nullable: true }),
    __metadata("design:type", String)
], TeamVisitMember.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'assigned_at' }),
    __metadata("design:type", Date)
], TeamVisitMember.prototype, "assignedAt", void 0);
exports.TeamVisitMember = TeamVisitMember = __decorate([
    (0, typeorm_1.Entity)('team_visit_members')
], TeamVisitMember);
//# sourceMappingURL=team-visit-member.entity.js.map