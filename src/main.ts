import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new I18nValidationPipe());

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Residee API')
    .setDescription('API documentation for the Residee platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Rota para visualização do Swagger UI
  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: '/api/swagger.json',
  });

  await app.listen(3333);
  // Enable CORS for all routes
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger UI is available at: ${await app.getUrl()}/api/docs`);
}

void bootstrap();
