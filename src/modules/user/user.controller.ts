import { FindOneDto } from '@/common/dto/find-one.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginatedSwaggerDocs, PaginateQuery } from 'nestjs-paginate';
import { USER_PAGINATION_CONFIG } from './config/paginate.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @PaginatedSwaggerDocs(UserEntity, USER_PAGINATION_CONFIG)
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<UserEntity>> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param() params: FindOneDto): Promise<UserEntity> {
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
