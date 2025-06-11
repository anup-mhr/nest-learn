import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { User } from 'generated/prisma';
import { GetUser, Public, Roles } from 'src/auth/decorator';
import { Role } from 'src/constants/enum';
import { JwtGuard } from 'src/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @SkipThrottle({ short: true })
  @Get('me') // Protected route - requires authentication
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('')
  editUser() {}

  // Public route - no authentication required
  @Public()
  @Get('public-info')
  getPublicInfo() {
    return { message: 'This is public information' };
  }

  // Admin only route
  @Roles(Role.ADMIN)
  @Get()
  getAllUsers() {
    return { message: 'Get all users - Admin only' };
  }

  // Multiple roles example
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return { message: `Delete user ${id} - Admin or Moderator only` };
  }

  // User can access their own data, Admin can access any
  @Get(':id')
  getUser(@Param('id') id: string) {
    // You can implement additional logic here to check if user owns the resource
    return { message: `Get user ${id}` };
  }
}
