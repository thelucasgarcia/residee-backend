import { AuthInvalidCredentialsException } from "@/shared/exceptions/auth-invalid-credentials.exception";
import { AuthInvalidRefreshTokenException } from "@/shared/exceptions/auth-invalid-refresh-token.exception";
import { AuthInvalidUserIdException } from "@/shared/exceptions/auth-invalid-user-id.exception";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RefreshToken } from "./entities/refresh-tokens.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) { }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: {
        id: true,
        roles: true,
        email: true,
        password: true,
      },
    });

    if (!user || !(bcrypt.compareSync(dto.password, user.password))) {
      throw new AuthInvalidCredentialsException()
    }

    if (!user.id) {
      throw new AuthInvalidUserIdException();
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles }
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    await this.refreshTokenRepository.save({
      user: user,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  }

  async refresh(dto: RefreshTokenDto) {
    try {
      const jwt = this.jwtService.verify(dto.refreshToken);
      const tokenEntity = await this.refreshTokenRepository.findOne({
        where: { token: dto.refreshToken, revoked: false },
        relations: ['user'],
      });

      if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
        throw new AuthInvalidRefreshTokenException();
      }

      const payload = { sub: jwt.id, email: jwt.email, roles: jwt.roles }
      const newAccessToken = this.jwtService.sign({ sub: payload.sub });

      await this.refreshTokenRepository.save({
        ...tokenEntity,
        revoked: true
      })

      return { accessToken: newAccessToken };
    } catch {
      throw new AuthInvalidRefreshTokenException();
    }
  }

  async logout(refreshToken: string) {
    await this.refreshTokenRepository.update({ token: refreshToken }, { revoked: true });
  }
}
