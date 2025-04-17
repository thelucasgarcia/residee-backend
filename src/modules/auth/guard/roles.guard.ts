import { I18nTranslations } from '@/generated/i18n.generated';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nContext } from 'nestjs-i18n';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleEnum } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const i18n = I18nContext.current<I18nTranslations>();
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.roles.includes(RoleEnum.ADMIN)) {
      return true;
    }

    if (!user?.roles || !requiredRoles.every(role => user.roles.includes(role))) {
      throw new ForbiddenException(i18n?.translate('errors.403_ROLE_FORBIDDEN'));
    }

    return true;
  }
}