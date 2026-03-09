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
    Res,
    UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { RFOService } from './rfo.service';

@Controller('rfo')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RFOController {
    constructor(private rfoService: RFOService) { }

    @Get()
    findAll(@Param() params: any, @Req() req: any) {
        const search = req.query?.search;
        return this.rfoService.findAll(search);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rfoService.findById(id);
    }

    @Post()
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT)
    create(@Body() body: any, @Req() req: any) {
        return this.rfoService.create(body, req.user.id, req.user.name);
    }

    @Put(':id')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT)
    update(@Param('id') id: string, @Body() body: any) {
        return this.rfoService.update(id, body);
    }

    @Patch(':id/approve')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2)
    approve(@Param('id') id: string, @Req() req: any) {
        return this.rfoService.approve(id, req.user.id);
    }

    @Delete(':id')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT)
    delete(@Param('id') id: string) {
        return this.rfoService.delete(id);
    }

    @Get(':id/pdf')
    async getPDF(@Param('id') id: string, @Res() res: Response) {
        const pdfBuffer = await this.rfoService.generatePDF(id);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="rfo-${id}.pdf"`,
            'Content-Length': pdfBuffer.length,
        });
        res.end(pdfBuffer);
    }
}
