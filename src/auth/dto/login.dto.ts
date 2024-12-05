import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'username', description: 'Username' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}