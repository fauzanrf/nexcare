import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Client } from './client.entity';

@Entity('isp_vendors')
export class ISPVendor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Client, (client) => client.ispVendors, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ name: 'client_id' })
    clientId: string;

    @Column({ name: 'vendor_name', length: 100 })
    vendorName: string;

    @Column({ name: 'vendor_cid', length: 100, nullable: true })
    vendorCid: string;

    @Column({ name: 'vendor_bandwidth', length: 50, nullable: true })
    vendorBandwidth: string;

    @Column({ name: 'install_name', length: 100, nullable: true })
    installName: string;

    @Column({ name: 'install_phone', length: 20, nullable: true })
    installPhone: string;

    @Column({ name: 'install_address', type: 'text', nullable: true })
    installAddress: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
