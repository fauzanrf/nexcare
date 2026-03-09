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
exports.ClientsController = exports.StarlinkController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_entity_1 = require("../users/user.entity");
const clients_service_1 = require("./clients.service");
let StarlinkController = class StarlinkController {
    clientsService;
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    findAllStarlink(search) {
        return this.clientsService.findAllStarlink(search);
    }
};
exports.StarlinkController = StarlinkController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StarlinkController.prototype, "findAllStarlink", null);
exports.StarlinkController = StarlinkController = __decorate([
    (0, common_1.Controller)('starlink'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], StarlinkController);
let ClientsController = class ClientsController {
    clientsService;
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    findAll(search) {
        return this.clientsService.findAll(search);
    }
    findOne(id) {
        return this.clientsService.findById(id);
    }
    create(body) {
        return this.clientsService.create(body);
    }
    update(id, body) {
        return this.clientsService.update(id, body);
    }
    delete(id) {
        return this.clientsService.delete(id);
    }
    addIsp(id, body) {
        return this.clientsService.addIspVendor(id, body);
    }
    deleteIsp(clientId, vendorId) {
        return this.clientsService.deleteIspVendor(clientId, vendorId);
    }
    addStarlink(id, body) {
        return this.clientsService.addStarlinkAccount(id, body);
    }
    updateStarlink(clientId, accountId, body) {
        return this.clientsService.updateStarlinkAccount(clientId, accountId, body);
    }
    deleteStarlink(clientId, accountId) {
        return this.clientsService.deleteStarlinkAccount(clientId, accountId);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SUPER_ADMIN, user_entity_1.UserRole.NOC2, user_entity_1.UserRole.NOC1, user_entity_1.UserRole.TECHNICAL_SUPPORT, user_entity_1.UserRole.PROVISIONING),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SUPER_ADMIN, user_entity_1.UserRole.NOC2, user_entity_1.UserRole.NOC1, user_entity_1.UserRole.TECHNICAL_SUPPORT, user_entity_1.UserRole.PROVISIONING),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SUPER_ADMIN, user_entity_1.UserRole.NOC2, user_entity_1.UserRole.NOC1, user_entity_1.UserRole.TECHNICAL_SUPPORT, user_entity_1.UserRole.PROVISIONING),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/isp'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SUPER_ADMIN, user_entity_1.UserRole.NOC2, user_entity_1.UserRole.NOC1, user_entity_1.UserRole.TECHNICAL_SUPPORT, user_entity_1.UserRole.PROVISIONING),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "addIsp", null);
__decorate([
    (0, common_1.Delete)(':clientId/isp/:vendorId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SUPER_ADMIN, user_entity_1.UserRole.NOC2, user_entity_1.UserRole.NOC1, user_entity_1.UserRole.TECHNICAL_SUPPORT, user_entity_1.UserRole.PROVISIONING),
    __param(0, (0, common_1.Param)('clientId')),
    __param(1, (0, common_1.Param)('vendorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "deleteIsp", null);
__decorate([
    (0, common_1.Post)(':id/starlink'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SUPER_ADMIN, user_entity_1.UserRole.NOC2, user_entity_1.UserRole.NOC1, user_entity_1.UserRole.TECHNICAL_SUPPORT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "addStarlink", null);
__decorate([
    (0, common_1.Put)(':clientId/starlink/:accountId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SUPER_ADMIN, user_entity_1.UserRole.NOC2, user_entity_1.UserRole.NOC1, user_entity_1.UserRole.TECHNICAL_SUPPORT),
    __param(0, (0, common_1.Param)('clientId')),
    __param(1, (0, common_1.Param)('accountId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updateStarlink", null);
__decorate([
    (0, common_1.Delete)(':clientId/starlink/:accountId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SUPER_ADMIN, user_entity_1.UserRole.NOC2, user_entity_1.UserRole.NOC1, user_entity_1.UserRole.TECHNICAL_SUPPORT),
    __param(0, (0, common_1.Param)('clientId')),
    __param(1, (0, common_1.Param)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "deleteStarlink", null);
exports.ClientsController = ClientsController = __decorate([
    (0, common_1.Controller)('clients'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map