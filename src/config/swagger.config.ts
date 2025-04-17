import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Residee API')
    .setDescription('API documentation for the Residee platform')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        description: 'Enter your Bearer token',
      },
    )
    .addSecurityRequirements('bearer')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  // Rota para visualização do Swagger UI
  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: '/api/swagger.json',
    raw: ['json', 'yaml'],

  });
}
