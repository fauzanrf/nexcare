import { Client } from './client.entity';
export declare class StarlinkAccount {
    id: string;
    client: Client;
    clientId: string;
    accountNumber: string;
    emailStarlink: string;
    passwordStarlink: string;
    emailHosting: string;
    passwordHosting: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
