import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    refreshToken(userId: string, rawRefreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(userId: string): Promise<void>;
    getMe(userId: string): Promise<any>;
    sanitizeUser(user: User): any;
}
