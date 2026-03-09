import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

export enum UserRole {
    SUPER_ADMIN = 'super_admin',
    NOC2 = 'noc2',
    NOC1 = 'noc1',
    TECHNICAL_SUPPORT = 'technical_support',
    MAGANG = 'magang',
    PROVISIONING = 'provisioning',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true, length: 150 })
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.NOC1 })
    role: UserRole;

    @Column({ name: 'avatar_url', nullable: true })
    avatarUrl: string;

    @Column({ name: 'signature_url', nullable: true })
    signatureUrl: string;

    @Column({ name: 'refresh_token', nullable: true, type: 'text' })
    refreshToken: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
