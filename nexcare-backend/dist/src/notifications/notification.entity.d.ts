import { User } from '../users/user.entity';
export declare class Notification {
    id: string;
    user: User;
    userId: string;
    message: string;
    isRead: boolean;
    link: string;
    createdAt: Date;
}
