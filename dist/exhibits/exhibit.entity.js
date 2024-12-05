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
exports.Exhibit = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../users/user.entity");
const comment_entity_1 = require("../comments/comment.entity");
let Exhibit = class Exhibit {
};
exports.Exhibit = Exhibit;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: 1, description: "Unique exhibit Id" }),
    __metadata("design:type", Number)
], Exhibit.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "imageUrl", description: "Exhibit image url" }),
    __metadata("design:type", String)
], Exhibit.prototype, "imageUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: "description", description: "Exhibit description" }),
    __metadata("design:type", String)
], Exhibit.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.exhibits, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.User)
], Exhibit.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Exhibit.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: "2024-11-27T00:00:00.000Z",
        description: "The date when the exhibit was created",
    }),
    __metadata("design:type", Date)
], Exhibit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.exhibit, { cascade: true }),
    (0, swagger_1.ApiProperty)({
        type: () => [comment_entity_1.Comment],
        description: "List of comments for the exhibit",
    }),
    __metadata("design:type", Array)
], Exhibit.prototype, "comments", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ default: 0 }),
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: "Number of comments for the exhibit",
    }),
    __metadata("design:type", Number)
], Exhibit.prototype, "commentCount", void 0);
exports.Exhibit = Exhibit = __decorate([
    (0, typeorm_1.Entity)()
], Exhibit);
//# sourceMappingURL=exhibit.entity.js.map