import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private notifRepository: Repository<Notification>,
    ) { }

    async create(userId: string, message: string, link?: string) {
        const notif = this.notifRepository.create({ userId, message, link });
        return this.notifRepository.save(notif);
    }

    async findByUser(userId: string) {
        return this.notifRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: 50,
        });
    }

    async markRead(id: string) {
        await this.notifRepository.update(id, { isRead: true });
        return { message: 'Marked as read' };
    }

    async markAllRead(userId: string) {
        await this.notifRepository.update({ userId, isRead: false }, { isRead: true });
        return { message: 'All marked as read' };
    }

    async getUnreadCount(userId: string): Promise<number> {
        return this.notifRepository.count({ where: { userId, isRead: false } });
    }
}
