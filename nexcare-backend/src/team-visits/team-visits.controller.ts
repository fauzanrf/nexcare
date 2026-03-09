import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Body,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { TeamVisitsService, MemberDto } from './team-visits.service';

@Controller('team-visits')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TeamVisitsController {
    constructor(private teamVisitsService: TeamVisitsService) { }

    @Get()
    findAll() {
        return this.teamVisitsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teamVisitsService.findById(id);
    }

    @Post()
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.PROVISIONING)
    create(@Body() body: any, @Req() req: any) {
        return this.teamVisitsService.create(body, req.user.id, req.user.name);
    }

    @Patch(':id/assign')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2)
    assign(
        @Param('id') id: string,
        @Body() body: { members: MemberDto[] },
        @Req() req: any,
    ) {
        return this.teamVisitsService.assign(id, body.members ?? [], req.user.id);
    }

    @Put(':id')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2)
    update(@Param('id') id: string, @Body() body: any) {
        return this.teamVisitsService.update(id, body);
    }

    @Delete(':id')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2)
    delete(@Param('id') id: string) {
        return this.teamVisitsService.delete(id);
    }
}
