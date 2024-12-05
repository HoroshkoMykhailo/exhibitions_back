import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Exhibit {
  @Expose()
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Unique exhibit Id" })
  id: number;

  @Expose()
  @Column()
  @ApiProperty({ example: "imageUrl", description: "Exhibit image url" })
  imageUrl: string;

  @Expose()
  @Column()
  @ApiProperty({ example: "description", description: "Exhibit description" })
  description: string;

  @Expose()
  @ManyToOne(() => User, (user) => user.exhibits, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @Expose()
  @CreateDateColumn()
  @ApiProperty({
    example: "2024-11-27T00:00:00.000Z",
    description: "The date when the exhibit was created",
  })
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.exhibit, { cascade: true })
  @ApiProperty({
    type: () => [Comment],
    description: "List of comments for the exhibit",
  })
  comments: Comment[];

  @Expose()
  @Column({ default: 0 })
  @ApiProperty({
    example: 5,
    description: "Number of comments for the exhibit",
  })
  commentCount: number 
}