import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExhibitsService } from 'src/exhibits/exhibits.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { plainToInstance } from 'class-transformer';
import { Comment } from './comment.entity';

@Controller("comments")
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  @Get(":exhibitId")
  @ApiOperation({ summary: "Get all comments for an exhibit" })
  @ApiResponse({ status: 200, description: "Successfull response" })
  @ApiResponse({ status: 404, description: "Exhibit not found" })
  async getComments(@Param("exhibitId") exhibitId: number) {
    const comments = await this.commentsService.getComments(exhibitId);

    return plainToInstance(Comment, comments, { excludeExtraneousValues: true });
  }

  @Post(":exhibitId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Create a new comment for an exhibit" })
  @ApiResponse({ status: 201, description: "Comment created successfully" })
  @ApiResponse({ status: 404, description: "Exhibit not found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async createComment(
    @Param("exhibitId") exhibitId: number,
    @Body() CreateCommentDto: CreateCommentDto,
    @Request() req
  ) {
    const comment = this.commentsService.createComment(CreateCommentDto.text, exhibitId, req.user.id);

    return plainToInstance(Comment, comment, { excludeExtraneousValues: true });
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Delete a comment" })
  @ApiResponse({ status: 200, description: "Comment deleted successfully" })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 401, description: "You are not permitted to delete this comment" })
  async deleteComment(
    @Param('commentId') commentId: number,
    @Request() req
  ) {

    await this.commentsService.deleteComment(commentId, req.user.id);

    return { message: 'Comment deleted successfully' };
  }
}
