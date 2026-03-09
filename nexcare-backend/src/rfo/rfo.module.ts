import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RFO } from './rfo.entity';
import { RFOService } from './rfo.service';
import { RFOController } from './rfo.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RFO])],
    providers: [RFOService],
    controllers: [RFOController],
    exports: [RFOService],
})
export class RFOModule { }
