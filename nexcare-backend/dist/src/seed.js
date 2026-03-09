"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const user_entity_1 = require("./users/user.entity");
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const users = [
        { name: 'Super Admin', email: 'admin@internetwork.net.id', password: 'admin', role: user_entity_1.UserRole.SUPER_ADMIN },
        { name: 'Admin NOC2', email: 'noc2@internetwork.net.id', password: 'noc2', role: user_entity_1.UserRole.NOC2 },
        { name: 'NOC One', email: 'noc1@internetwork.net.id', password: 'noc1', role: user_entity_1.UserRole.NOC1 },
        { name: 'Tech Support', email: 'techsup@internetwork.net.id', password: 'techsup', role: user_entity_1.UserRole.TECHNICAL_SUPPORT },
        { name: 'Intern User', email: 'magang@internetwork.net.id', password: 'magang', role: user_entity_1.UserRole.MAGANG },
        { name: 'Provisioning', email: 'provisioning@internetwork.net.id', password: 'provi', role: user_entity_1.UserRole.PROVISIONING },
    ];
    for (const u of users) {
        try {
            await usersService.create(u);
            console.log(`✅ Created user: ${u.email} (${u.role})`);
        }
        catch (err) {
            if (err.message?.includes('already in use') || err.status === 409) {
                console.log(`⏭️  Skipped (already exists): ${u.email}`);
            }
            else {
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
//# sourceMappingURL=seed.js.map