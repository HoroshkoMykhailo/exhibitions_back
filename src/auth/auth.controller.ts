import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Successful authentication. Returns access token and user info' })
  @ApiResponse({ status: 400, description: 'Data is missing' })
  @ApiResponse({ status: 401, description: 'Incorrect username or password' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {

    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    const { access_token } = await this.authService.login(user);

    return {
      access_token,
      userName: loginDto.username,
      userRole: user.role,
      userId: user.id,
    };

  }
}