import { Exhibit } from '../exhibits/exhibit.entity';
import { Comment } from '../comments/comment.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    exhibits: Exhibit[];
    comments: Comment[];
}
