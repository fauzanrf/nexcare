import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ISPVendor } from './isp-vendor.entity';
import { StarlinkAccount } from './starlink-account.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { StarlinkController } from './clients.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Client, ISPVendor, StarlinkAccount])],
    providers: [ClientsService],
    controllers: [ClientsController, StarlinkController],
    exports: [ClientsService],
})
export class ClientsModule { }
