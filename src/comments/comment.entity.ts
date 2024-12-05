import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Exhibit } from '../exhibits/exhibit.entity';
import { User } from '../users/user.entity';

@Entity()
export class Comment {
  @Expose()
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique comment Id' })
  id: number;

  @Expose()
  @Column()
  @ApiProperty({ example: 'Great exhibit!', description: 'Content of the comment' })
  text: string;

  @Expose()
  @ManyToOne(() => Exhibit, (exhibit) => exhibit.comments, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Exhibit, description: 'The exhibit this comment belongs to' })
  exhibit: Exhibit;

  @Column()
  exhibitId: number;

  @Expose()
  @ManyToOne(() => User, { eager: true })
  @ApiProperty({ type: () => User, description: 'The user who created the comment' })
  user: User;

  @Column()
  userId: number;

  @Expose()
  @CreateDateColumn()
  @ApiProperty({ example: '2024-11-27T00:00:00.000Z', description: 'The date when the comment was created' })
  createdAt: Date;
}