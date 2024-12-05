import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
export declare class Exhibit {
    id: number;
    imageUrl: string;
    description: string;
    user: User;
    userId: number;
    createdAt: Date;
    comments: Comment[];
    commentCount: number;
}
