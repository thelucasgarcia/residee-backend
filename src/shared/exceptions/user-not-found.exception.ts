import { ForbiddenException } from '@nestjs/common'
import { I18nContext } from 'nestjs-i18n'
import { I18nTranslations } from '@/generated/i18n.generated'

export class UserNotFoundException extends ForbiddenException {
  constructor(message?: string) {
    const i18n = I18nContext.current<I18nTranslations>()
    super(message || i18n?.translate('errors.404_USER_NOT_FOUND'))
  }
}
