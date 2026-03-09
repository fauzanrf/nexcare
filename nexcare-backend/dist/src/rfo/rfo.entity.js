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
exports.RFO = exports.TicketStatus = exports.RFOCategory = exports.RFOStatus = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../clients/client.entity");
const user_entity_1 = require("../users/user.entity");
var RFOStatus;
(function (RFOStatus) {
    RFOStatus["PENDING"] = "pending";
    RFOStatus["APPROVED"] = "approved";
})(RFOStatus || (exports.RFOStatus = RFOStatus = {}));
var RFOCategory;
(function (RFOCategory) {
    RFOCategory["HARD"] = "Hard";
    RFOCategory["NORMAL"] = "Normal";
    RFOCategory["EASY"] = "Easy";
})(RFOCategory || (exports.RFOCategory = RFOCategory = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "Open";
    TicketStatus["CLOSE"] = "Close";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
let RFO = class RFO {
    id;
    rfoNumber;
    client;
    clientId;
    clientName;
    cidIw;
    createdBy;
    createdById;
    createdByName;
    incidentDate;
    incidentHour;
    durationMinutes;
    impactedSla;
    category;
    statusTicket;
    status;
    incidentDescription;
    rootCause;
    actionTaken;
    approvedById;
    approvedAt;
    createdAt;
    updatedAt;
};
exports.RFO = RFO;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RFO.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rfo_number', length: 50, unique: true }),
    __metadata("design:type", String)
], RFO.prototype, "rfoNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], RFO.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', nullable: true }),
    __metadata("design:type", String)
], RFO.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_name', length: 150 }),
    __metadata("design:type", String)
], RFO.prototype, "clientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cid_iw', length: 50, nullable: true }),
    __metadata("design:type", String)
], RFO.prototype, "cidIw", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], RFO.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', nullable: true }),
    __metadata("design:type", String)
], RFO.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_name', length: 100, nullable: true }),
    __metadata("design:type", String)
], RFO.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'incident_date', type: 'date' }),
    __metadata("design:type", String)
], RFO.prototype, "incidentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'incident_hour', length: 50, nullable: true }),
    __metadata("design:type", String)
], RFO.prototype, "incidentHour", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_minutes', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], RFO.prototype, "durationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'impacted_sla', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], RFO.prototype, "impactedSla", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RFOCategory, default: RFOCategory.NORMAL }),
    __metadata("design:type", String)
], RFO.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_ticket', type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN }),
    __metadata("design:type", String)
], RFO.prototype, "statusTicket", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RFOStatus, default: RFOStatus.PENDING }),
    __metadata("design:type", String)
], RFO.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'incident_description', type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], RFO.prototype, "incidentDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'root_cause', type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], RFO.prototype, "rootCause", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'action_taken', type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], RFO.prototype, "actionTaken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by', nullable: true }),
    __metadata("design:type", String)
], RFO.prototype, "approvedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], RFO.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RFO.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], RFO.prototype, "updatedAt", void 0);
exports.RFO = RFO = __decorate([
    (0, typeorm_1.Entity)('rfos')
], RFO);
//# sourceMappingURL=rfo.entity.js.map