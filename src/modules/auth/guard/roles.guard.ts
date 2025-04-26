import { RoleForbiddenException } from '@/shared/exceptions/role-invalid-forbidden.exception';
import {
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleEnum } from '../enums/role.enum';
import { User } from '@/modules/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user as User;

    if (user?.roles?.includes(RoleEnum.ADMIN)) {
      return true;
    }

    if (!user?.roles || !requiredRoles.every(role => user?.roles?.includes(role))) {
      throw new RoleForbiddenException();
    }

    return true;
  }
}