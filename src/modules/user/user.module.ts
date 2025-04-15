import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { I18nModule } from 'nestjs-i18n';
import { i18nConfig } from '@/config/i18n.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    I18nModule.forRoot(i18nConfig),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository, // Adicionado como provider
  ],
  exports: [UserRepository], // Exportado caso outros módulos precisem dele
})
export class UserModule { }