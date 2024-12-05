import { Repository } from 'typeorm';
import { Exhibit } from './exhibit.entity';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { User } from '../users/user.entity';
export declare class ExhibitsService {
    private readonly exhibitsRepository;
    private readonly notificationsService;
    constructor(exhibitsRepository: Repository<Exhibit>, notificationsService: NotificationsGateway);
    getExhibitsWithPagination(page: number, limit: number, where?: Record<string, number>): Promise<[Exhibit[], number]>;
    createExhibit(file: Express.Multer.File, description: string, user: User): Promise<Exhibit>;
    getExhibitById(id: number): Promise<Exhibit | null>;
    deleteExhibitById(id: number, userId: number): Promise<void>;
    changeCommentCount(exhibitId: number, delta: number): Promise<void>;
}
