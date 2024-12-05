"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExhibitsModule = void 0;
const common_1 = require("@nestjs/common");
const exhibits_service_1 = require("./exhibits.service");
const exhibits_controller_1 = require("./exhibits.controller");
const typeorm_1 = require("@nestjs/typeorm");
const exhibit_entity_1 = require("./exhibit.entity");
const user_entity_1 = require("../users/user.entity");
const comment_entity_1 = require("../comments/comment.entity");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let ExhibitsModule = class ExhibitsModule {
};
exports.ExhibitsModule = ExhibitsModule;
exports.ExhibitsModule = ExhibitsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exhibit_entity_1.Exhibit, user_entity_1.User, comment_entity_1.Comment])],
        controllers: [exhibits_controller_1.ExhibitsController],
        exports: [exhibits_service_1.ExhibitsService],
        providers: [exhibits_service_1.ExhibitsService, notifications_gateway_1.NotificationsGateway]
    })
], ExhibitsModule);
//# sourceMappingURL=exhibits.module.js.map