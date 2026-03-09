import {
    Controller,
    Get,
    Patch,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationsController {
    constructor(private notifService: NotificationsService) { }

    @Get()
    findMine(@Req() req: any) {
        return this.notifService.findByUser(req.user.id);
    }

    @Get('unread-count')
    getCount(@Req() req: any) {
        return this.notifService.getUnreadCount(req.user.id);
    }

    @Patch(':id/read')
    markRead(@Param('id') id: string) {
        return this.notifService.markRead(id);
    }

    @Patch('mark-all-read')
    markAllRead(@Req() req: any) {
        return this.notifService.markAllRead(req.user.id);
    }
}
