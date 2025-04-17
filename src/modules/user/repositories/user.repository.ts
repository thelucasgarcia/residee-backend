import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { USER_PAGINATION_CONFIG } from '../config/paginate.config';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository implements BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) { }

  findAll(input: PaginateQuery): Promise<Paginated<User>> {
    return paginate(input, this.repo, USER_PAGINATION_CONFIG)
  }

  create(input: CreateUserDto): Promise<User> {
    return this.repo.save(input);
  }

  findOne(id: string): Promise<User | null> {
    return this.repo.findOne({
      where: { id },
    })
  }

  update(id: string, input: User): Promise<User> {
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
