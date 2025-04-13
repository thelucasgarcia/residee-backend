import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
} from 'nestjs-i18n';
import { join } from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-*': 'en',
        pt: 'pt-BR',
      },
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
      resolvers: [
        AcceptLanguageResolver,
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang', 'x-lang']),
        new CookieResolver(),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('AppModule initialized');
  }
}
