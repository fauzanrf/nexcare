import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    create(dto: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<User>;
    updateProfile(id: string, dto: {
        name?: string;
        avatarUrl?: string;
        signatureUrl?: string;
    }): Promise<User>;
    changePassword(id: string, newPassword: string): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
