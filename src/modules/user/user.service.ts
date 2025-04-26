import { I18nTranslations } from '@/generated/i18n.generated';
import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PaginateQuery } from 'nestjs-paginate';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserNotFoundException } from '@/shared/exceptions/user-not-found.exception';
import { EmailAlreadyExistsException } from '@/shared/exceptions/email-already-exists.exception';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.repository.findByEmail(createUserDto.email)

    if (userExist) {
      throw new EmailAlreadyExistsException()
    }

    return this.repository.create(createUserDto);
  }

  findAll(query: PaginateQuery) {
    return this.repository.findAll(query)
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id)
    if (!user) {
      throw new UserNotFoundException()
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    return this.repository.delete(user.id)
  }
}
