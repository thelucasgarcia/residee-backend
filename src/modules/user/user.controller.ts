import { FindOneDto } from '@/common/dto/find-one.dto';
import { RoleEnum } from '@/modules/auth/enums/role.enum';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginatedSwaggerDocs, PaginateQuery } from 'nestjs-paginate';
import { USER_PAGINATION_CONFIG } from './config/paginate.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('admin-only')
  @Roles(RoleEnum.USER)
  getForAdmins() {
    return 'Only admin can access';
  }

  @Get('landlord-or-admin')
  @Roles(RoleEnum.ADMIN, RoleEnum.OWNER)
  getForSomeRoles() {
    return 'Landlords or admins only';
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @PaginatedSwaggerDocs(User, USER_PAGINATION_CONFIG)
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  findOne(@Param() params: FindOneDto): Promise<User> {
    return this.userService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
