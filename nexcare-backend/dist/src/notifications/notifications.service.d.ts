import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
export declare class NotificationsService {
    private notifRepository;
    constructor(notifRepository: Repository<Notification>);
    create(userId: string, message: string, link?: string): Promise<Notification>;
    findByUser(userId: string): Promise<Notification[]>;
    markRead(id: string): Promise<{
        message: string;
    }>;
    markAllRead(userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<number>;
}
