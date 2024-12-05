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
exports.ExhibitsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exhibit_entity_1 = require("./exhibit.entity");
const uuid_1 = require("uuid");
const fs = require("fs");
const path = require("path");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let ExhibitsService = class ExhibitsService {
    constructor(exhibitsRepository, notificationsService) {
        this.exhibitsRepository = exhibitsRepository;
        this.notificationsService = notificationsService;
    }
    async getExhibitsWithPagination(page, limit, where = {}) {
        const skip = (page - 1) * limit;
        return await this.exhibitsRepository.findAndCount({
            where,
            take: limit,
            skip,
            order: {
                createdAt: "DESC",
            },
        });
    }
    async createExhibit(file, description, user) {
        if (!file) {
            throw new common_1.BadRequestException("Image is required");
        }
        const uniqueFileName = `${(0, uuid_1.v4)()}${path.extname(file.originalname)}`;
        const uploadFolder = path.join(__dirname, "../../static");
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }
        const filePath = path.join(uploadFolder, uniqueFileName);
        fs.writeFileSync(filePath, file.buffer);
        const exhibit = this.exhibitsRepository.create({
            imageUrl: `/static/${uniqueFileName}`,
            description,
            userId: user.id,
        });
        this.notificationsService.handleNewExhibit({ message: "New exhibit created", user: user.username });
        return await this.exhibitsRepository.save(exhibit);
    }
    async getExhibitById(id) {
        const exhibit = await this.exhibitsRepository.findOneBy({ id });
        if (!exhibit) {
            throw new common_1.NotFoundException("Exhibit not found");
        }
        return exhibit;
    }
    async deleteExhibitById(id, userId) {
        const exhibit = await this.exhibitsRepository.findOne({ where: { id } });
        if (!exhibit) {
            throw new common_1.NotFoundException("Exhibit not found");
        }
        if (exhibit.userId !== userId) {
            throw new common_1.UnauthorizedException("You are not permitted to delete this exhibit");
        }
        await this.exhibitsRepository.remove(exhibit);
    }
    async changeCommentCount(exhibitId, delta) {
        const exhibit = await this.exhibitsRepository.findOne({ where: { id: exhibitId } });
        if (!exhibit) {
            throw new Error('Exhibit not found');
        }
        exhibit.commentCount = Math.max(0, exhibit.commentCount + delta);
        await this.exhibitsRepository.save(exhibit);
    }
};
exports.ExhibitsService = ExhibitsService;
exports.ExhibitsService = ExhibitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exhibit_entity_1.Exhibit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notifications_gateway_1.NotificationsGateway])
], ExhibitsService);
//# sourceMappingURL=exhibits.service.js.map