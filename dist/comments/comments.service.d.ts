import { Repository } from "typeorm";
import { Comment } from './comment.entity';
import { ExhibitsService } from 'src/exhibits/exhibits.service';
export declare class CommentsService {
    private readonly commentsRepository;
    private readonly exhibitsService;
    constructor(commentsRepository: Repository<Comment>, exhibitsService: ExhibitsService);
    getComments(exhibitId: number): Promise<Comment[]>;
    createComment(text: string, exhibitId: number, userId: number): Promise<Comment>;
    deleteComment(commentId: number, userId: number): Promise<void>;
}
