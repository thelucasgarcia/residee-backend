import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity<T = any> {
  constructor(props: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>, id?: string) {
    this.id = id || uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0' })
  public id: string;

  @CreateDateColumn()
  @ApiProperty({ example: '2023-10-01T12:34:56.789Z' })
  public createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2023-10-02T12:34:56.789Z' })
  public updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @ApiProperty({ example: '2023-10-03T12:34:56.789Z', nullable: true })
  public deletedAt: Date | null;

  public markAsUpdated(): void {
    this.updatedAt = new Date();
  }

  public markAsDeleted(): void {
    this.deletedAt = new Date();
  }

  public isDeleted(): boolean {
    return this.deletedAt !== null;
  }
}