import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'username', description: 'username for registration' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(4, { message: 'Username has to be longer than 4 characters' })
  username: string;


  @ApiProperty({ example: 'password', description: 'User password' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4, { message: 'Password has to be longer than 4 characters' })
  password: string;
}