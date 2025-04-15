import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { USER_PAGINATION_CONFIG } from '../config/paginate.config';
import { Column } from 'nestjs-paginate/lib/helper';

@Injectable()
export class UserRepository implements BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) { }

  findAll(input: PaginateQuery): Promise<Paginated<UserEntity>> {
    return paginate(input, this.repo, USER_PAGINATION_CONFIG)
  }

  create(input: CreateUserDto): Promise<UserEntity> {
    return this.repo.save(input);
  }

  findOne(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { id },
    })
  }

  update(id: string, input: UserEntity): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  count(): Promise<number> {
    throw new Error('Method not implemented.');
  }
  exists(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}
