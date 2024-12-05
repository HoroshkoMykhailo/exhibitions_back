import { Exhibit } from '../exhibits/exhibit.entity';
import { User } from '../users/user.entity';
export declare class Comment {
    id: number;
    text: string;
    exhibit: Exhibit;
    exhibitId: number;
    user: User;
    userId: number;
    createdAt: Date;
}
