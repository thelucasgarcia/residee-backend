import { Paginated, PaginateQuery } from "nestjs-paginate";
import { BaseEntity } from "../entities/base.entity";

export interface BaseRepository<E extends BaseEntity> {
  findAll(input?: PaginateQuery): Promise<Paginated<E>>;
  findOne(id: string): Promise<E | null>;
  create(input: E): Promise<E>;
  update(id: string, input: E): Promise<E>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
  exists(id: string): Promise<boolean>;
}