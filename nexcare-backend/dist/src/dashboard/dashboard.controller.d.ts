import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<{
        rfoPending: number;
        rfoApproved: number;
        starlinkActive: number;
        starlinkSuspend: number;
        upcomingVisits: import("../team-visits/team-visit.entity").TeamVisit[];
    }>;
}
