import { I18nTranslations } from '@/generated/i18n.generated';
import { UnauthorizedException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class AuthInvalidCredentialsException extends UnauthorizedException {
  constructor(message?: string) {
    const i18n = I18nContext.current<I18nTranslations>();
    super(message || i18n?.translate('errors.401_AUTH_INVALID_CREDENTIALS'))
  }
}
