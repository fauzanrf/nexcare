import type { Response } from 'express';
import { RFOService } from './rfo.service';
export declare class RFOController {
    private rfoService;
    constructor(rfoService: RFOService);
    findAll(params: any, req: any): Promise<import("./rfo.entity").RFO[]>;
    findOne(id: string): Promise<import("./rfo.entity").RFO>;
    create(body: any, req: any): Promise<import("./rfo.entity").RFO>;
    update(id: string, body: any): Promise<import("./rfo.entity").RFO>;
    approve(id: string, req: any): Promise<import("./rfo.entity").RFO>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getPDF(id: string, res: Response): Promise<void>;
}
