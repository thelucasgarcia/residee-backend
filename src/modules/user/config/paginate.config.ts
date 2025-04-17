import { PaginateConfig } from "nestjs-paginate";
import { User } from "../entities/user.entity";

export const USER_PAGINATION_CONFIG: PaginateConfig<User> = {
  sortableColumns: ['name', 'email', 'createdAt', 'updatedAt'],
  searchableColumns: ['name', 'email'],
  multiWordSearch: true,
}