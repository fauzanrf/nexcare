import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Body,
    Param,
    Req,
    UseGuards,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user.entity';
import { UsersService } from './users.service';

const multerConfig = (dest: string) =>
    diskStorage({
        destination: dest,
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
    });

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2)
    findAll() {
        return this.usersService.findAll();
    }

    @Post()
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2)
    create(@Body() body: { name: string; email: string; password: string; role?: UserRole }) {
        return this.usersService.create(body);
    }

    @Patch(':id/profile')
    updateProfile(@Param('id') id: string, @Body() body: { name?: string }) {
        return this.usersService.updateProfile(id, body);
    }

    @Post(':id/avatar')
    @UseInterceptors(FileInterceptor('file', { storage: multerConfig('./uploads/avatars') }))
    async uploadAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        const avatarUrl = `/uploads/avatars/${file.filename}`;
        return this.usersService.updateProfile(id, { avatarUrl });
    }

    @Post(':id/signature')
    @UseInterceptors(FileInterceptor('file', { storage: multerConfig('./uploads/signatures') }))
    async uploadSignature(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        const signatureUrl = `/uploads/signatures/${file.filename}`;
        return this.usersService.updateProfile(id, { signatureUrl });
    }

    @Patch(':id/password')
    async changePassword(@Param('id') id: string, @Body() body: { password: string }) {
        return this.usersService.changePassword(id, body.password);
    }

    @Delete(':id')
    @Roles(UserRole.SUPER_ADMIN, UserRole.NOC2)
    delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
