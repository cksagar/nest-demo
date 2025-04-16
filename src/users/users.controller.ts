import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';

import { Serialize } from 'src/interceptors/CustomSerializeInterceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Serialize(UserDto)
@Controller('/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/profile')
  getProfile(@CurrentUser() user: User) {
    if (!user) {
      throw new BadRequestException('user not found or session expired');
    }
    return {
      message: 'User profile fetched successfully',
      data: { id: user.id, email: user.email },
    };
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found!!!!');
    }
    return user;
  }

  @Get()
  getUserByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('/all')
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() attrs: UpdateUserDTO) {
    return this.userService.update(parseInt(id), attrs);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }
}
