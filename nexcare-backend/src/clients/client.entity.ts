import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { ISPVendor } from './isp-vendor.entity';
import { StarlinkAccount } from './starlink-account.entity';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'cid_iw', length: 50, unique: true })
    cidIw: string;

    @Column({ length: 150 })
    name: string;

    @Column({ length: 50, nullable: true })
    bandwidth: string;

    @Column({ length: 100, nullable: true })
    services: string;

    @Column({ name: 'm2m_number', length: 100, nullable: true })
    m2mNumber: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ name: 'pic_phone', length: 20, nullable: true })
    picPhone: string;

    @OneToMany(() => ISPVendor, (vendor) => vendor.client, { cascade: true, eager: false })
    ispVendors: ISPVendor[];

    @OneToMany(() => StarlinkAccount, (sl) => sl.client, { cascade: true, eager: false })
    starlinkAccounts: StarlinkAccount[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
