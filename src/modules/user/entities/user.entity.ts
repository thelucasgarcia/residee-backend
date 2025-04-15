import { BaseEntity } from '@/common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Column, Entity } from 'typeorm';

export type Role = 'USER' | 'OWNER' | 'AGENT' | 'AGENCY' | 'ADMIN';
const Role: Role[] = ['USER', 'OWNER', 'AGENT', 'AGENCY', 'ADMIN'];

@Entity('users')
export class UserEntity extends BaseEntity<UserEntity> {
  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ example: 'John Doe' })
  public name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty({ example: 'john@example.com' })
  public email: string;

  @Column({
    type: 'varchar', length: 255, select: false,
    transformer: {
      to: (value: string) => bcrypt.hashSync(value, 10),
      from: (value: string) => value,
    }
  })
  @ApiProperty({ example: 'password123', description: 'Encrypted password', writeOnly: true, required: true })
  public password: string;

  @Column({ type: 'enum', enum: Role, nullable: false, array: true, default: Role['USER'] })
  @ApiProperty({ isArray: true, enumName: 'roles', enum: Role, default: Role['USER'] })
  public roles: Role[];
}