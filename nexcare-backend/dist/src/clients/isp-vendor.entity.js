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
exports.ISPVendor = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./client.entity");
let ISPVendor = class ISPVendor {
    id;
    client;
    clientId;
    vendorName;
    vendorCid;
    vendorBandwidth;
    installName;
    installPhone;
    installAddress;
    createdAt;
};
exports.ISPVendor = ISPVendor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ISPVendor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.ispVendors, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], ISPVendor.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id' }),
    __metadata("design:type", String)
], ISPVendor.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_name', length: 100 }),
    __metadata("design:type", String)
], ISPVendor.prototype, "vendorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_cid', length: 100, nullable: true }),
    __metadata("design:type", String)
], ISPVendor.prototype, "vendorCid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_bandwidth', length: 50, nullable: true }),
    __metadata("design:type", String)
], ISPVendor.prototype, "vendorBandwidth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'install_name', length: 100, nullable: true }),
    __metadata("design:type", String)
], ISPVendor.prototype, "installName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'install_phone', length: 20, nullable: true }),
    __metadata("design:type", String)
], ISPVendor.prototype, "installPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'install_address', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ISPVendor.prototype, "installAddress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ISPVendor.prototype, "createdAt", void 0);
exports.ISPVendor = ISPVendor = __decorate([
    (0, typeorm_1.Entity)('isp_vendors')
], ISPVendor);
//# sourceMappingURL=isp-vendor.entity.js.map