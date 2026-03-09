import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll() {
        const users = await this.userRepository.find({
            select: ['id', 'name', 'email', 'role', 'avatarUrl', 'signatureUrl', 'createdAt'],
        });
        return users;
    }

    async findById(id: string) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'role', 'avatarUrl', 'signatureUrl', 'createdAt'],
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async create(dto: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }) {
        const existing = await this.userRepository.findOne({ where: { email: dto.email } });
        if (existing) throw new ConflictException('Email already in use');
        const hash = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            name: dto.name,
            email: dto.email,
            passwordHash: hash,
            role: dto.role || UserRole.NOC1,
        });
        return this.userRepository.save(user);
    }

    async updateProfile(
        id: string,
        dto: { name?: string; avatarUrl?: string; signatureUrl?: string },
    ) {
        await this.userRepository.update(id, dto);
        return this.findById(id);
    }

    async changePassword(id: string, newPassword: string) {
        const hash = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(id, { passwordHash: hash });
        return { message: 'Password updated successfully' };
    }

    async delete(id: string) {
        const user = await this.findById(id);
        await this.userRepository.delete(id);
        return { message: 'User deleted successfully' };
    }
}
