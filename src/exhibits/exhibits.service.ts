import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './exhibit.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { User } from '../users/user.entity';

@Injectable()
export class ExhibitsService {
  constructor(
    @InjectRepository(Exhibit)
    private readonly exhibitsRepository: Repository<Exhibit>,
    private readonly notificationsService: NotificationsGateway
  ) {}

  async getExhibitsWithPagination(
    page: number,
    limit: number,
    where: Record<string, number> = {}
  ): Promise<[Exhibit[], number]> {
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

  async createExhibit(
    file: Express.Multer.File,
    description: string,
    user: User
  ): Promise<Exhibit> {

    if(!file) {
      throw new BadRequestException("Image is required");
    }
    
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
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

  async getExhibitById(id: number): Promise<Exhibit | null> {
    const exhibit = await this.exhibitsRepository.findOneBy({ id });

    if (!exhibit) {
      throw new NotFoundException("Exhibit not found");
    }

    return exhibit;
  }

  async deleteExhibitById(id: number, userId: number): Promise<void> {
    const exhibit = await this.exhibitsRepository.findOne({ where: { id } });

    if (!exhibit) {
      throw new NotFoundException("Exhibit not found");
    }

    if (exhibit.userId !== userId) {
      throw new UnauthorizedException("You are not permitted to delete this exhibit");
    }

    await this.exhibitsRepository.remove(exhibit);
  }

  async changeCommentCount(exhibitId: number, delta: number): Promise<void> {
    const exhibit = await this.exhibitsRepository.findOne({ where: { id: exhibitId } });

    if (!exhibit) {
      throw new Error('Exhibit not found');
    }

    exhibit.commentCount = Math.max(0, exhibit.commentCount + delta);
    await this.exhibitsRepository.save(exhibit);
  }
}