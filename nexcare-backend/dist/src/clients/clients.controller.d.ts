import { ClientsService } from './clients.service';
export declare class StarlinkController {
    private clientsService;
    constructor(clientsService: ClientsService);
    findAllStarlink(search?: string): Promise<import("./starlink-account.entity").StarlinkAccount[]>;
}
export declare class ClientsController {
    private clientsService;
    constructor(clientsService: ClientsService);
    findAll(search?: string): Promise<import("./client.entity").Client[]>;
    findOne(id: string): Promise<import("./client.entity").Client>;
    create(body: any): Promise<import("./client.entity").Client>;
    update(id: string, body: any): Promise<import("./client.entity").Client>;
    delete(id: string): Promise<{
        message: string;
    }>;
    addIsp(id: string, body: any): Promise<import("./isp-vendor.entity").ISPVendor>;
    deleteIsp(clientId: string, vendorId: string): Promise<{
        message: string;
    }>;
    addStarlink(id: string, body: any): Promise<import("./starlink-account.entity").StarlinkAccount>;
    updateStarlink(clientId: string, accountId: string, body: any): Promise<import("./starlink-account.entity").StarlinkAccount | null>;
    deleteStarlink(clientId: string, accountId: string): Promise<{
        message: string;
    }>;
}
