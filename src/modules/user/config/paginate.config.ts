import { PaginateConfig } from "nestjs-paginate";
import { UserEntity } from "../entities/user.entity";

export const USER_PAGINATION_CONFIG: PaginateConfig<UserEntity> = {
  sortableColumns: ['name', 'email', 'createdAt', 'updatedAt'],
  searchableColumns: ['name', 'email'],
  multiWordSearch: true,
}