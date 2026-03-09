import { Client } from './client.entity';
export declare class ISPVendor {
    id: string;
    client: Client;
    clientId: string;
    vendorName: string;
    vendorCid: string;
    vendorBandwidth: string;
    installName: string;
    installPhone: string;
    installAddress: string;
    createdAt: Date;
}
