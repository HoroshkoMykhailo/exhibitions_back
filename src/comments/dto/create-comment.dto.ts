import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'test', description: 'Text of the comment' })
  @IsNotEmpty({ message: 'Text is required' })
  text: string;
}