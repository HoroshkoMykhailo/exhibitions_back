import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from "typeorm";
import { Comment } from './comment.entity';
import { ExhibitsService } from 'src/exhibits/exhibits.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly exhibitsService: ExhibitsService
  ) {}

  async getComments(exhibitId: number): Promise<Comment[]> {

    await this.exhibitsService.getExhibitById(exhibitId);
    return this.commentsRepository.find({
      where: { exhibitId },
      order: {
        createdAt: "DESC",
      },
    });
  }

  async createComment(text: string, exhibitId: number, userId: number): Promise<Comment> {
    await this.exhibitsService.getExhibitById(exhibitId);

    const newComment = this.commentsRepository.create({
      text,
      exhibitId,
      userId,
    });

    await this.exhibitsService.changeCommentCount(exhibitId, 1);
    return this.commentsRepository.save(newComment);
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.commentsRepository.findOne({
        where: { id: commentId },
      });

      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      if(comment.userId !== userId) {
        throw new UnauthorizedException('You are not permitted to delete this comment');
      }

      await this.exhibitsService.changeCommentCount(comment.exhibitId, -1);
      await this.commentsRepository.remove(comment);
    }
}
