"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RFOModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rfo_entity_1 = require("./rfo.entity");
const rfo_service_1 = require("./rfo.service");
const rfo_controller_1 = require("./rfo.controller");
let RFOModule = class RFOModule {
};
exports.RFOModule = RFOModule;
exports.RFOModule = RFOModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rfo_entity_1.RFO])],
        providers: [rfo_service_1.RFOService],
        controllers: [rfo_controller_1.RFOController],
        exports: [rfo_service_1.RFOService],
    })
], RFOModule);
//# sourceMappingURL=rfo.module.js.map