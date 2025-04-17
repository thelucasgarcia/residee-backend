import { I18nTranslations } from '@/generated/i18n.generated';
import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PaginateQuery } from 'nestjs-paginate';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private readonly i18n: I18nService<I18nTranslations>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findAll(query: PaginateQuery) {
    return this.repository.findAll(query)
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id)
    if (!user) {
      throw new NotFoundException(this.i18n.translate('errors.404_USER_NOT_FOUND'))
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
