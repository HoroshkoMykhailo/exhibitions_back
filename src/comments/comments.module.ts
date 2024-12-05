import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { User } from '../users/user.entity';
import { Exhibit } from '../exhibits/exhibit.entity';
import { Comment } from './comment.entity';
import { ExhibitsModule } from '../exhibits/exhibits.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Exhibit, Comment]), ExhibitsModule],
  controllers: [CommentsController],
  exports: [CommentsService],
  providers: [CommentsService],
})
export class CommentsModule {}