"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comments_controller_1 = require("./comments.controller");
const comments_service_1 = require("./comments.service");
const user_entity_1 = require("../users/user.entity");
const exhibit_entity_1 = require("../exhibits/exhibit.entity");
const comment_entity_1 = require("./comment.entity");
const exhibits_module_1 = require("../exhibits/exhibits.module");
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, exhibit_entity_1.Exhibit, comment_entity_1.Comment]), exhibits_module_1.ExhibitsModule],
        controllers: [comments_controller_1.CommentsController],
        exports: [comments_service_1.CommentsService],
        providers: [comments_service_1.CommentsService],
    })
], CommentsModule);
//# sourceMappingURL=comments.module.js.map