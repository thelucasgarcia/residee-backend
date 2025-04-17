import { BaseEntity } from '@/common/entities/base.entity';
import { RefreshToken } from '@/modules/auth/entities/refresh-tokens.entity';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsEmpty, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

type Role = 'USER' | 'OWNER' | 'AGENT' | 'AGENCY' | 'ADMIN';
const Role: Role[] = ['USER', 'OWNER', 'AGENT', 'AGENCY', 'ADMIN'];

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    description: 'Full name of the user.',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Profile picture of the user',
  })
  @IsEmpty()
  @IsString()
  public picture?: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty({
    description: 'Email address of the user. Must be a valid email format.',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsEmail()
  public email: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
    transformer: {
      to: (value: string) => bcrypt.hashSync(value, 10),
      from: (value: string) => value,
    }
  })
  @ApiProperty({
    description: 'Password for the user account. Must be at least 6 characters long.',
    example: 'password123',
    minLength: 6,
    writeOnly: true,
    required: true
  })
  @IsNotEmpty()
  @MinLength(6)
  public password: string;

  @Column({ type: 'enum', enum: Role, nullable: false, array: true, default: ["USER"] })
  @ApiProperty({ isArray: true, enumName: 'Roles', enum: Role, default: ["USER"], required: true })
  public roles: Role[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken, { onDelete: 'CASCADE' })
  refreshTokens: RefreshToken[];
}