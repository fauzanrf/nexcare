import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private authService;
    private jwtService;
    private configService;
    constructor(authService: AuthService, jwtService: JwtService, configService: ConfigService);
    login(body: {
        email: string;
        password: string;
    }, res: Response): Promise<{
        accessToken: string;
        user: any;
    }>;
    refresh(req: Request): Promise<{
        accessToken: string;
    }>;
    logout(req: any, res: Response): Promise<{
        message: string;
    }>;
    me(req: any): Promise<any>;
}
