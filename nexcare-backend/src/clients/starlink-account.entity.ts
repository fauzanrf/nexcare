import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Client } from './client.entity';

@Entity('starlink_accounts')
export class StarlinkAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Client, (client) => client.starlinkAccounts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ name: 'client_id' })
    clientId: string;

    @Column({ name: 'account_number', length: 100, nullable: true })
    accountNumber: string;

    @Column({ name: 'email_starlink', length: 150, nullable: true })
    emailStarlink: string;

    @Column({ name: 'password_starlink', nullable: true })
    passwordStarlink: string;

    @Column({ name: 'email_hosting', length: 150, nullable: true })
    emailHosting: string;

    @Column({ name: 'password_hosting', nullable: true })
    passwordHosting: string;

    @Column({ default: 'Active', length: 50 })
    status: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
