"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const clients_module_1 = require("./clients/clients.module");
const rfo_module_1 = require("./rfo/rfo.module");
const team_visits_module_1 = require("./team-visits/team-visits.module");
const notifications_module_1 = require("./notifications/notifications.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const user_entity_1 = require("./users/user.entity");
const client_entity_1 = require("./clients/client.entity");
const isp_vendor_entity_1 = require("./clients/isp-vendor.entity");
const starlink_account_entity_1 = require("./clients/starlink-account.entity");
const rfo_entity_1 = require("./rfo/rfo.entity");
const team_visit_entity_1 = require("./team-visits/team-visit.entity");
const team_visit_member_entity_1 = require("./team-visits/team-visit-member.entity");
const notification_entity_1 = require("./notifications/notification.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    type: 'mysql',
                    host: config.get('DB_HOST') || 'localhost',
                    port: config.get('DB_PORT') || 3306,
                    username: config.get('DB_USER') || 'root',
                    password: config.get('DB_PASS') || '',
                    database: config.get('DB_NAME') || 'nexcare_db',
                    entities: [user_entity_1.User, client_entity_1.Client, isp_vendor_entity_1.ISPVendor, starlink_account_entity_1.StarlinkAccount, rfo_entity_1.RFO, team_visit_entity_1.TeamVisit, team_visit_member_entity_1.TeamVisitMember, notification_entity_1.Notification],
                    synchronize: true,
                    logging: false,
                }),
                inject: [config_1.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            clients_module_1.ClientsModule,
            rfo_module_1.RFOModule,
            team_visits_module_1.TeamVisitsModule,
            notifications_module_1.NotificationsModule,
            dashboard_module_1.DashboardModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map