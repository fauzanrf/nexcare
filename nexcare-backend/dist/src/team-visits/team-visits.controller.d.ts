import { TeamVisitsService, MemberDto } from './team-visits.service';
export declare class TeamVisitsController {
    private teamVisitsService;
    constructor(teamVisitsService: TeamVisitsService);
    findAll(): Promise<import("./team-visit.entity").TeamVisit[]>;
    findOne(id: string): Promise<import("./team-visit.entity").TeamVisit | null>;
    create(body: any, req: any): Promise<import("./team-visit.entity").TeamVisit>;
    assign(id: string, body: {
        members: MemberDto[];
    }, req: any): Promise<import("./team-visit.entity").TeamVisit | null>;
    update(id: string, body: any): Promise<import("./team-visit.entity").TeamVisit | null>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
