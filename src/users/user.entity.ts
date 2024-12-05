import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Exhibit } from '../exhibits/exhibit.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique user Id' })
  id: number;

  @Expose()
  @Column({ unique: true })
  @ApiProperty({ example: 'username', description: 'Unique username' })
  username: string;

  @Column()
  @ApiProperty({ example: 'hashedPassword', description: 'Hashed password' })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
  @ApiProperty({ type: () => [Exhibit], description: 'List of exhibits, created by user' })
  exhibits: Exhibit[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  @ApiProperty({ type: () => [Comment], description: 'List of comments made by the user' })
  comments: Comment[];
}