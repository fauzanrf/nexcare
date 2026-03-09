import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { UserRole } from './users/user.entity';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersService = app.get(UsersService);

    const users = [
        { name: 'Super Admin', email: 'admin@internetwork.net.id', password: 'admin', role: UserRole.SUPER_ADMIN },
        { name: 'Admin NOC2', email: 'noc2@internetwork.net.id', password: 'noc2', role: UserRole.NOC2 },
        { name: 'NOC One', email: 'noc1@internetwork.net.id', password: 'noc1', role: UserRole.NOC1 },
        { name: 'Tech Support', email: 'techsup@internetwork.net.id', password: 'techsup', role: UserRole.TECHNICAL_SUPPORT },
        { name: 'Intern User', email: 'magang@internetwork.net.id', password: 'magang', role: UserRole.MAGANG },
        { name: 'Provisioning', email: 'provisioning@internetwork.net.id', password: 'provi', role: UserRole.PROVISIONING },
    ];

    for (const u of users) {
        try {
            await usersService.create(u);
            console.log(`✅ Created user: ${u.email} (${u.role})`);
        } catch (err: any) {
            if (err.message?.includes('already in use') || err.status === 409) {
                console.log(`⏭️  Skipped (already exists): ${u.email}`);
            } else {
                console.error(`❌ Failed to create ${u.email}:`, err.message);
            }
        }
    }

    await app.close();
    console.log('\n✅ Database seeding complete!');
    console.log('\nLogin credentials:');
    users.forEach((u) => console.log(`  ${u.role.padEnd(20)}: ${u.email} / ${u.password}`));
}

seed().catch(console.error);
