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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./client.entity");
const isp_vendor_entity_1 = require("./isp-vendor.entity");
const starlink_account_entity_1 = require("./starlink-account.entity");
let ClientsService = class ClientsService {
    clientRepository;
    ispRepository;
    starlinkRepository;
    constructor(clientRepository, ispRepository, starlinkRepository) {
        this.clientRepository = clientRepository;
        this.ispRepository = ispRepository;
        this.starlinkRepository = starlinkRepository;
    }
    async findAll(search) {
        if (search) {
            return this.clientRepository.find({
                where: [{ name: (0, typeorm_2.Like)(`%${search}%`) }, { cidIw: (0, typeorm_2.Like)(`%${search}%`) }],
                order: { createdAt: 'DESC' },
            });
        }
        return this.clientRepository.find({ order: { createdAt: 'DESC' } });
    }
    async findById(id) {
        const client = await this.clientRepository.findOne({
            where: { id },
            relations: ['ispVendors', 'starlinkAccounts'],
        });
        if (!client)
            throw new common_1.NotFoundException('Client not found');
        return client;
    }
    async create(dto) {
        const existing = await this.clientRepository.findOne({
            where: { cidIw: dto.cidIw },
        });
        if (existing)
            throw new common_1.ConflictException('CID IW already exists');
        const client = this.clientRepository.create(dto);
        return this.clientRepository.save(client);
    }
    async update(id, dto) {
        await this.findById(id);
        await this.clientRepository.update(id, dto);
        return this.findById(id);
    }
    async delete(id) {
        await this.findById(id);
        await this.clientRepository.delete(id);
        return { message: 'Client deleted' };
    }
    async addIspVendor(clientId, dto) {
        await this.findById(clientId);
        const vendor = this.ispRepository.create({ ...dto, clientId });
        return this.ispRepository.save(vendor);
    }
    async deleteIspVendor(clientId, vendorId) {
        await this.ispRepository.delete({ id: vendorId, clientId });
        return { message: 'ISP vendor removed' };
    }
    async findAllStarlink(search) {
        const options = {
            relations: ['client'],
            order: { createdAt: 'DESC' },
        };
        if (search) {
            options.where = [
                { accountNumber: (0, typeorm_2.Like)(`%${search}%`) },
                { emailStarlink: (0, typeorm_2.Like)(`%${search}%`) },
                { status: (0, typeorm_2.Like)(`%${search}%`) },
            ];
        }
        return this.starlinkRepository.find(options);
    }
    async addStarlinkAccount(clientId, dto) {
        await this.findById(clientId);
        const account = this.starlinkRepository.create({ ...dto, clientId });
        return this.starlinkRepository.save(account);
    }
    async updateStarlinkAccount(clientId, accountId, dto) {
        const account = await this.starlinkRepository.findOne({ where: { id: accountId, clientId } });
        if (!account)
            throw new common_1.NotFoundException('Starlink account not found');
        await this.starlinkRepository.update(accountId, dto);
        return this.starlinkRepository.findOne({ where: { id: accountId }, relations: ['client'] });
    }
    async deleteStarlinkAccount(clientId, accountId) {
        await this.starlinkRepository.delete({ id: accountId, clientId });
        return { message: 'Starlink account removed' };
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(isp_vendor_entity_1.ISPVendor)),
    __param(2, (0, typeorm_1.InjectRepository)(starlink_account_entity_1.StarlinkAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map