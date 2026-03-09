import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { ClientsService } from './clients.service';

// Starlink routes (global, not nested under clients)
@Controller('starlink')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StarlinkController {
    constructor(private clientsService: ClientsService) { }

    @Get()
    findAllStarlink(@Query('search') search?: string) {
        return this.clientsService.findAllStarlink(search);
    }
}


@Controller('clients')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ClientsController {
    constructor(private clientsService: ClientsService) { }

    @Get()
    findAll(@Query('search') search?: string) {
        return this.clientsService.findAll(search);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientsService.findById(id);
    }

    @Post()
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT, UserRole.PROVISIONING)
    create(@Body() body: any) {
        return this.clientsService.create(body);
    }

    @Put(':id')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT, UserRole.PROVISIONING)
    update(@Param('id') id: string, @Body() body: any) {
        return this.clientsService.update(id, body);
    }

    @Delete(':id')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT, UserRole.PROVISIONING)
    delete(@Param('id') id: string) {
        return this.clientsService.delete(id);
    }

    // ISP Vendors
    @Post(':id/isp')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT, UserRole.PROVISIONING)
    addIsp(@Param('id') id: string, @Body() body: any) {
        return this.clientsService.addIspVendor(id, body);
    }

    @Delete(':clientId/isp/:vendorId')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT, UserRole.PROVISIONING)
    deleteIsp(@Param('clientId') clientId: string, @Param('vendorId') vendorId: string) {
        return this.clientsService.deleteIspVendor(clientId, vendorId);
    }

    // Starlink Accounts
    @Post(':id/starlink')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT)
    addStarlink(@Param('id') id: string, @Body() body: any) {
        return this.clientsService.addStarlinkAccount(id, body);
    }

    @Put(':clientId/starlink/:accountId')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT)
    updateStarlink(@Param('clientId') clientId: string, @Param('accountId') accountId: string, @Body() body: any) {
        return this.clientsService.updateStarlinkAccount(clientId, accountId, body);
    }

    @Delete(':clientId/starlink/:accountId')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2, UserRole.NOC1, UserRole.TECHNICAL_SUPPORT)
    deleteStarlink(@Param('clientId') clientId: string, @Param('accountId') accountId: string) {
        return this.clientsService.deleteStarlinkAccount(clientId, accountId);
    }
}
