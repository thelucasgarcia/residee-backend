import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nMiddleware, I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@/config/swagger.config';
import { JwtAuthGuard } from './modules/auth/guard/auth.guard';
import { RolesGuard } from './modules/auth/guard/roles.guard';

declare const module: {
  hot?: { accept: () => void; dispose: (callback: () => void) => void };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  setupSwagger(app)

  // Enable CORS for all routes
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  //Middlewares
  app.use(I18nMiddleware)

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalPipes(new I18nValidationPipe());

  // Filters
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => void app.close());
  }

  await app.listen(3333);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger UI is available at: ${await app.getUrl()}/api/docs`);
}

void bootstrap();
