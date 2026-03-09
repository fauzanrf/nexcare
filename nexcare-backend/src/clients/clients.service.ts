import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Client } from './client.entity';
import { ISPVendor } from './isp-vendor.entity';
import { StarlinkAccount } from './starlink-account.entity';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
        @InjectRepository(ISPVendor)
        private ispRepository: Repository<ISPVendor>,
        @InjectRepository(StarlinkAccount)
        private starlinkRepository: Repository<StarlinkAccount>,
    ) { }

    async findAll(search?: string) {
        if (search) {
            return this.clientRepository.find({
                where: [{ name: Like(`%${search}%`) }, { cidIw: Like(`%${search}%`) }],
                order: { createdAt: 'DESC' },
            });
        }
        return this.clientRepository.find({ order: { createdAt: 'DESC' } });
    }

    async findById(id: string) {
        const client = await this.clientRepository.findOne({
            where: { id },
            relations: ['ispVendors', 'starlinkAccounts'],
        });
        if (!client) throw new NotFoundException('Client not found');
        return client;
    }

    async create(dto: Partial<Client>) {
        const existing = await this.clientRepository.findOne({
            where: { cidIw: dto.cidIw },
        });
        if (existing) throw new ConflictException('CID IW already exists');
        const client = this.clientRepository.create(dto);
        return this.clientRepository.save(client);
    }

    async update(id: string, dto: Partial<Client>) {
        await this.findById(id);
        await this.clientRepository.update(id, dto);
        return this.findById(id);
    }

    async delete(id: string) {
        await this.findById(id);
        await this.clientRepository.delete(id);
        return { message: 'Client deleted' };
    }

    // ISP Vendor
    async addIspVendor(clientId: string, dto: Partial<ISPVendor>) {
        await this.findById(clientId);
        const vendor = this.ispRepository.create({ ...dto, clientId });
        return this.ispRepository.save(vendor);
    }

    async deleteIspVendor(clientId: string, vendorId: string) {
        await this.ispRepository.delete({ id: vendorId, clientId });
        return { message: 'ISP vendor removed' };
    }

    // Starlink Account
    async findAllStarlink(search?: string) {
        const options: FindManyOptions<StarlinkAccount> = {
            relations: ['client'],
            order: { createdAt: 'DESC' },
        };
        if (search) {
            options.where = [
                { accountNumber: Like(`%${search}%`) },
                { emailStarlink: Like(`%${search}%`) },
                { status: Like(`%${search}%`) },
            ];
        }
        return this.starlinkRepository.find(options);
    }

    async addStarlinkAccount(clientId: string, dto: Partial<StarlinkAccount>) {
        await this.findById(clientId);
        const account = this.starlinkRepository.create({ ...dto, clientId });
        return this.starlinkRepository.save(account);
    }

    async updateStarlinkAccount(clientId: string, accountId: string, dto: Partial<StarlinkAccount>) {
        const account = await this.starlinkRepository.findOne({ where: { id: accountId, clientId } });
        if (!account) throw new NotFoundException('Starlink account not found');
        await this.starlinkRepository.update(accountId, dto);
        return this.starlinkRepository.findOne({ where: { id: accountId }, relations: ['client'] });
    }

    async deleteStarlinkAccount(clientId: string, accountId: string) {
        await this.starlinkRepository.delete({ id: accountId, clientId });
        return { message: 'Starlink account removed' };
    }
}
