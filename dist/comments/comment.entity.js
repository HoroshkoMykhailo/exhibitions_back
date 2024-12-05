"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const exhibit_entity_1 = require("../exhibits/exhibit.entity");
const user_entity_1 = require("../users/user.entity");
let Comment = class Comment {
};
exports.Comment = Comment;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Unique comment Id' }),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'Great exhibit!', description: 'Content of the comment' }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.ManyToOne)(() => exhibit_entity_1.Exhibit, (exhibit) => exhibit.comments, { onDelete: 'CASCADE' }),
    (0, swagger_1.ApiProperty)({ type: () => exhibit_entity_1.Exhibit, description: 'The exhibit this comment belongs to' }),
    __metadata("design:type", exhibit_entity_1.Exhibit)
], Comment.prototype, "exhibit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comment.prototype, "exhibitId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, description: 'The user who created the comment' }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({ example: '2024-11-27T00:00:00.000Z', description: 'The date when the comment was created' }),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)()
], Comment);
//# sourceMappingURL=comment.entity.js.map