import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nOptions, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';

export const i18nConfig: I18nOptions = {
  fallbackLanguage: 'en',
  fallbacks: {
    'en-*': 'en',
    pt: 'pt-BR',
    es: 'es-ES',
  },
  loaderOptions: {
    path: join(__dirname, '..', 'src', 'i18n'),
    watch: true,
  },
  typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
  resolvers: [
    AcceptLanguageResolver,
    new QueryResolver(['lang', 'l']),
    new HeaderResolver(['x-custom-lang', 'x-lang']),
    new CookieResolver(),
  ],

}