import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { User } from 'generated/prisma';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @SkipThrottle({ short: true })
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('')
  editUser() {}
}
