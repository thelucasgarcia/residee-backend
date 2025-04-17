import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the refresh token', example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The refresh token string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'Expiration date of the refresh token', example: '2023-10-01T12:34:56.789Z' })
  expiresAt: Date;

  @Column({ default: false })
  @ApiProperty({ description: 'Indicates if the token has been revoked', example: false })
  revoked: boolean;

  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'The user associated with this refresh token' })
  user: User;
}