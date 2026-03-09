import { UserRole } from './user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./user.entity").User[]>;
    create(body: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<import("./user.entity").User>;
    updateProfile(id: string, body: {
        name?: string;
    }): Promise<import("./user.entity").User>;
    uploadAvatar(id: string, file: Express.Multer.File): Promise<import("./user.entity").User>;
    uploadSignature(id: string, file: Express.Multer.File): Promise<import("./user.entity").User>;
    changePassword(id: string, body: {
        password: string;
    }): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
