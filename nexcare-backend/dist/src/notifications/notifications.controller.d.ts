import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private notifService;
    constructor(notifService: NotificationsService);
    findMine(req: any): Promise<import("./notification.entity").Notification[]>;
    getCount(req: any): Promise<number>;
    markRead(id: string): Promise<{
        message: string;
    }>;
    markAllRead(req: any): Promise<{
        message: string;
    }>;
}
