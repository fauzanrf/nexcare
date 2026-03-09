import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return user;
    }

    async login(user: User) {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
        const jwtSecret = this.configService.get<string>('JWT_SECRET') || 'nexcare_jwt_secret_key_2026';
        const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') || 'nexcare_refresh_secret_key_2026';

        // Use numeric seconds for expiresIn to satisfy StringValue/number type
        const accessToken = this.jwtService.sign(payload, {
            secret: jwtSecret,
            expiresIn: 3600, // 60 minutes
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: refreshSecret,
            expiresIn: 604800, // 7 days
        });

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(user.id, { refreshToken: hashedRefreshToken });
        return { accessToken, refreshToken, user: this.sanitizeUser(user) };
    }

    async refreshToken(userId: string, rawRefreshToken: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user || !user.refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        const isMatch = await bcrypt.compare(rawRefreshToken, user.refreshToken);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
        const jwtSecret = this.configService.get<string>('JWT_SECRET') || 'nexcare_jwt_secret_key_2026';
        const newAccessToken = this.jwtService.sign(payload, {
            secret: jwtSecret,
            expiresIn: 3600,
        });
        return { accessToken: newAccessToken };
    }

    async logout(userId: string) {
        // Set refreshToken to empty string instead of null to satisfy non-nullable column
        await this.userRepository.update(userId, { refreshToken: '' });
    }

    async getMe(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException();
        return this.sanitizeUser(user);
    }

    sanitizeUser(user: User) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, refreshToken, ...rest } = user as any;
        return rest;
    }
}
