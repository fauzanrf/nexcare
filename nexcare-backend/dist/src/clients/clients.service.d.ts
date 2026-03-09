import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { ISPVendor } from './isp-vendor.entity';
import { StarlinkAccount } from './starlink-account.entity';
export declare class ClientsService {
    private clientRepository;
    private ispRepository;
    private starlinkRepository;
    constructor(clientRepository: Repository<Client>, ispRepository: Repository<ISPVendor>, starlinkRepository: Repository<StarlinkAccount>);
    findAll(search?: string): Promise<Client[]>;
    findById(id: string): Promise<Client>;
    create(dto: Partial<Client>): Promise<Client>;
    update(id: string, dto: Partial<Client>): Promise<Client>;
    delete(id: string): Promise<{
        message: string;
    }>;
    addIspVendor(clientId: string, dto: Partial<ISPVendor>): Promise<ISPVendor>;
    deleteIspVendor(clientId: string, vendorId: string): Promise<{
        message: string;
    }>;
    findAllStarlink(search?: string): Promise<StarlinkAccount[]>;
    addStarlinkAccount(clientId: string, dto: Partial<StarlinkAccount>): Promise<StarlinkAccount>;
    updateStarlinkAccount(clientId: string, accountId: string, dto: Partial<StarlinkAccount>): Promise<StarlinkAccount | null>;
    deleteStarlinkAccount(clientId: string, accountId: string): Promise<{
        message: string;
    }>;
}
