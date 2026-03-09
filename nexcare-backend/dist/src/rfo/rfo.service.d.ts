import { Repository } from 'typeorm';
import { RFO } from './rfo.entity';
export declare class RFOService {
    private rfoRepository;
    constructor(rfoRepository: Repository<RFO>);
    private generateRFONumber;
    findAll(search?: string): Promise<RFO[]>;
    findById(id: string): Promise<RFO>;
    create(dto: Partial<RFO>, userId: string, userName: string): Promise<RFO>;
    update(id: string, dto: Partial<RFO>): Promise<RFO>;
    approve(id: string, userId: string): Promise<RFO>;
    delete(id: string): Promise<{
        message: string;
    }>;
    generatePDF(id: string): Promise<Buffer>;
    private buildPDFHtml;
}
