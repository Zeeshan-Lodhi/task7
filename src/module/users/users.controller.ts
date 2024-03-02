import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { UserDto } from './Dto/user.dto';
import { UserService } from './users.service';
import { InvalidRequestValidator } from 'src/validation/pipes';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UserService) {}
  @Get('users')
  @UsePipes(new InvalidRequestValidator())
  async findAll(@Query() q: UserDto) {
    try {
      let { results, totalCount } = await this.usersService.findAll(q);
      return {
        total_count: totalCount,
        total_page: Math.ceil(totalCount / q?.take || 1),
        data: results,
      };
    } catch (e) {
      console.error(e);
    }
  }
}
