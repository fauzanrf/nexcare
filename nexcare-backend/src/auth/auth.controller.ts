import {
    Controller,
    Post,
    Body,
    Req,
    Res,
    Get,
    UseGuards,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    @Post('login')
    async login(
        @Body() body: { email: string; password: string },
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.authService.validateUser(body.email, body.password);
        const { accessToken, refreshToken, user: sanitized } = await this.authService.login(user);
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return { accessToken, user: sanitized };
    }

    @Post('refresh')
    async refresh(@Req() req: Request) {
        const refreshToken = (req as any).cookies?.['refresh_token'];
        if (!refreshToken) throw new UnauthorizedException('No refresh token');
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });
            return await this.authService.refreshToken(payload.sub as string, refreshToken as string);
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
        await this.authService.logout(req.user.id);
        res.clearCookie('refresh_token');
        return { message: 'Logged out successfully' };
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async me(@Req() req: any) {
        return this.authService.getMe(req.user.id);
    }
}
