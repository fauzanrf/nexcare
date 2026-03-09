import { ISPVendor } from './isp-vendor.entity';
import { StarlinkAccount } from './starlink-account.entity';
export declare class Client {
    id: string;
    cidIw: string;
    name: string;
    bandwidth: string;
    services: string;
    m2mNumber: string;
    address: string;
    picPhone: string;
    ispVendors: ISPVendor[];
    starlinkAccounts: StarlinkAccount[];
    createdAt: Date;
    updatedAt: Date;
}
