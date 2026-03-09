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
exports.StarlinkAccount = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./client.entity");
let StarlinkAccount = class StarlinkAccount {
    id;
    client;
    clientId;
    accountNumber;
    emailStarlink;
    passwordStarlink;
    emailHosting;
    passwordHosting;
    status;
    createdAt;
    updatedAt;
};
exports.StarlinkAccount = StarlinkAccount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StarlinkAccount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.starlinkAccounts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], StarlinkAccount.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], StarlinkAccount.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_number', length: 100, nullable: true }),
    __metadata("design:type", String)
], StarlinkAccount.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_starlink', length: 150, nullable: true }),
    __metadata("design:type", String)
], StarlinkAccount.prototype, "emailStarlink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_starlink', nullable: true }),
    __metadata("design:type", String)
], StarlinkAccount.prototype, "passwordStarlink", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_hosting', length: 150, nullable: true }),
    __metadata("design:type", String)
], StarlinkAccount.prototype, "emailHosting", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hosting', nullable: true }),
    __metadata("design:type", String)
], StarlinkAccount.prototype, "passwordHosting", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Active', length: 50 }),
    __metadata("design:type", String)
], StarlinkAccount.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StarlinkAccount.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StarlinkAccount.prototype, "updatedAt", void 0);
exports.StarlinkAccount = StarlinkAccount = __decorate([
    (0, typeorm_1.Entity)('starlink_accounts')
], StarlinkAccount);
//# sourceMappingURL=starlink-account.entity.js.map