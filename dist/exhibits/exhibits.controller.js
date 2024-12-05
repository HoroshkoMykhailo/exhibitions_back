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
exports.ExhibitsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exhibits_service_1 = require("./exhibits.service");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const image_file_filter_1 = require("./filters/image-file.filter");
const class_transformer_1 = require("class-transformer");
const exhibit_entity_1 = require("./exhibit.entity");
let ExhibitsController = class ExhibitsController {
    constructor(exhibitsService) {
        this.exhibitsService = exhibitsService;
    }
    async getExhibits(page = 1, limit = 10) {
        const [exhibits, total] = await this.exhibitsService.getExhibitsWithPagination(page, limit);
        return {
            exhibits: (0, class_transformer_1.plainToInstance)(exhibit_entity_1.Exhibit, exhibits, {
                excludeExtraneousValues: true,
            }),
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }
    async createExhibit({ description }, file, req) {
        const exhibit = await this.exhibitsService.createExhibit(file, description, req.user);
        return (0, class_transformer_1.plainToInstance)(exhibit_entity_1.Exhibit, exhibit, { excludeExtraneousValues: true });
    }
    async getExhibitById(id) {
        const exhibit = await this.exhibitsService.getExhibitById(id);
        return (0, class_transformer_1.plainToInstance)(exhibit_entity_1.Exhibit, exhibit, { excludeExtraneousValues: true });
    }
    async getMyExhibits(page = 1, limit = 10, req) {
        const [exhibits, total] = await this.exhibitsService.getExhibitsWithPagination(page, limit, { userId: req.user.id });
        return {
            exhibits: (0, class_transformer_1.plainToInstance)(exhibit_entity_1.Exhibit, exhibits, {
                excludeExtraneousValues: true,
            }),
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }
    async deleteExhibit(id, req) {
        await this.exhibitsService.deleteExhibitById(id, req.user.id);
        return { message: "Exhibit successfully deleted" };
    }
};
exports.ExhibitsController = ExhibitsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get exhibits" }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, description: "Page number" }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, description: "Items per page" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Successful response" }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ExhibitsController.prototype, "getExhibits", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", {
        fileFilter: image_file_filter_1.imageFileFilter,
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiOperation)({ summary: "New exhibit creation" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Exhibit successfully created" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Only images are allowed" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Image is required" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                image: { type: "string", format: "binary" },
                description: { type: "string", default: "" },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExhibitsController.prototype, "createExhibit", null);
__decorate([
    (0, common_1.Get)("post/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Exhibit details" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Successful response" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Exhibit not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExhibitsController.prototype, "getExhibitById", null);
__decorate([
    (0, common_1.Get)("my-posts"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiOperation)({ summary: "My exhibits" }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, description: "Page number" }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, description: "Items per page" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Successful response" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ExhibitsController.prototype, "getMyExhibits", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiOperation)({ summary: "Exhibit deletion" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Exhibit successfully deleted" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Exhibit not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExhibitsController.prototype, "deleteExhibit", null);
exports.ExhibitsController = ExhibitsController = __decorate([
    (0, common_1.Controller)("exhibits"),
    __metadata("design:paramtypes", [exhibits_service_1.ExhibitsService])
], ExhibitsController);
//# sourceMappingURL=exhibits.controller.js.map