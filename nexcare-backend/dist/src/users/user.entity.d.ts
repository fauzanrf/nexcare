export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    NOC2 = "noc2",
    NOC1 = "noc1",
    TECHNICAL_SUPPORT = "technical_support",
    MAGANG = "magang",
    PROVISIONING = "provisioning"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    avatarUrl: string;
    signatureUrl: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}
