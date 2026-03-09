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
exports.TeamVisit = exports.VisitStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const team_visit_member_entity_1 = require("./team-visit-member.entity");
var VisitStatus;
(function (VisitStatus) {
    VisitStatus["PENDING"] = "pending";
    VisitStatus["ASSIGNED"] = "assigned";
    VisitStatus["DONE"] = "done";
})(VisitStatus || (exports.VisitStatus = VisitStatus = {}));
let TeamVisit = class TeamVisit {
    id;
    title;
    notes;
    scheduledDate;
    scheduledTime;
    location;
    assignedTo;
    assignedToId;
    assignedToName;
    createdBy;
    createdById;
    createdByName;
    status;
    members;
    createdAt;
    updatedAt;
};
exports.TeamVisit = TeamVisit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TeamVisit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], TeamVisit.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TeamVisit.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_date', type: 'date' }),
    __metadata("design:type", String)
], TeamVisit.prototype, "scheduledDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_time', length: 20, nullable: true }),
    __metadata("design:type", String)
], TeamVisit.prototype, "scheduledTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'location', length: 255, nullable: true }),
    __metadata("design:type", String)
], TeamVisit.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_to' }),
    __metadata("design:type", user_entity_1.User)
], TeamVisit.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_to', nullable: true }),
    __metadata("design:type", String)
], TeamVisit.prototype, "assignedToId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_to_name', length: 100, nullable: true }),
    __metadata("design:type", String)
], TeamVisit.prototype, "assignedToName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], TeamVisit.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', nullable: true }),
    __metadata("design:type", String)
], TeamVisit.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_name', length: 100, nullable: true }),
    __metadata("design:type", String)
], TeamVisit.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: VisitStatus, default: VisitStatus.PENDING }),
    __metadata("design:type", String)
], TeamVisit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_visit_member_entity_1.TeamVisitMember, (m) => m.teamVisit, { cascade: true, eager: false }),
    __metadata("design:type", Array)
], TeamVisit.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TeamVisit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], TeamVisit.prototype, "updatedAt", void 0);
exports.TeamVisit = TeamVisit = __decorate([
    (0, typeorm_1.Entity)('team_visits')
], TeamVisit);
//# sourceMappingURL=team-visit.entity.js.map