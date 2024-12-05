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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const class_transformer_1 = require("class-transformer");
const comment_entity_1 = require("./comment.entity");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async getComments(exhibitId) {
        const comments = await this.commentsService.getComments(exhibitId);
        return (0, class_transformer_1.plainToInstance)(comment_entity_1.Comment, comments, { excludeExtraneousValues: true });
    }
    async createComment(exhibitId, CreateCommentDto, req) {
        const comment = this.commentsService.createComment(CreateCommentDto.text, exhibitId, req.user.id);
        return (0, class_transformer_1.plainToInstance)(comment_entity_1.Comment, comment, { excludeExtraneousValues: true });
    }
    async deleteComment(commentId, req) {
        await this.commentsService.deleteComment(commentId, req.user.id);
        return { message: 'Comment deleted successfully' };
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Get)(":exhibitId"),
    (0, swagger_1.ApiOperation)({ summary: "Get all comments for an exhibit" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Successfull response" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Exhibit not found" }),
    __param(0, (0, common_1.Param)("exhibitId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getComments", null);
__decorate([
    (0, common_1.Post)(":exhibitId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiOperation)({ summary: "Create a new comment for an exhibit" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Comment created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Exhibit not found" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    __param(0, (0, common_1.Param)("exhibitId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Delete)(':commentId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a comment" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Comment deleted successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comment not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "You are not permitted to delete this comment" }),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteComment", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)("comments"),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map