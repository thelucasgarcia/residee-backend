import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { RefreshToken } from "./entities/refresh-tokens.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt'
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { I18nContext } from "nestjs-i18n";
import { I18nTranslations } from "@/generated/i18n.generated";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) { }

  async login(dto: LoginDto) {
    const i18n = I18nContext.current<I18nTranslations>();
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
      select: {
        id: true,
        roles: true,
        email: true,
        password: true,
      },
    });

    if (!user || !(bcrypt.compareSync(dto.password, user.password))) {
      throw new UnauthorizedException(i18n?.translate('errors.401_AUTH_INVALID_CREDENTIALS'));
    }

    // Certifique-se de que o user.id existe antes de criar o token
    if (!user.id) {
      throw new ForbiddenException(i18n?.translate('errors.403_AUTH_INVALID_USER_ID'));
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles }
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    await this.refreshTokenRepo.save({
      user: user,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  }

  async refresh(dto: RefreshTokenDto) {
    const i18n = I18nContext.current<I18nTranslations>();
    try {
      const jwt = this.jwtService.verify(dto.refreshToken);
      const tokenEntity = await this.refreshTokenRepo.findOne({
        where: { token: dto.refreshToken, revoked: false },
        relations: ['user'],
      });

      if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
        throw new ForbiddenException(i18n?.translate('errors.403_AUTH_INVALID_REFRESH_TOKEN'));
      }

      const payload = { sub: jwt.id, email: jwt.email, roles: jwt.roles }
      const newAccessToken = this.jwtService.sign({ sub: payload.sub });

      await this.refreshTokenRepo.save({
        ...tokenEntity,
        revoked: true
      })

      return { accessToken: newAccessToken };
    } catch {
      throw new ForbiddenException(i18n?.translate('errors.403_AUTH_INVALID_REFRESH_TOKEN'));
    }
  }

  async logout(refreshToken: string) {
    await this.refreshTokenRepo.update({ token: refreshToken }, { revoked: true });
  }
}
