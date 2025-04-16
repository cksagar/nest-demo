import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;

    return {
      message: 'User signed up successfully!',
      data: { id: user.id, email: user.email },
    };
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;

    return {
      message: 'User signed in successfully!',
      data: { id: user.id, email: user.email },
    };
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
    return { message: 'Logged out successfully' };
  }
}
