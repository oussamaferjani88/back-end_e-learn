import { Controller } from '@nestjs/common';
import { Post, Request } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Request() req) {
    const { email, password, account } = req.body;
    return this.authService.validateUser(email, password);
  }
}
