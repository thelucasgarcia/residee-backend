import { Entity, Column, OneToMany } from 'typeorm'
import { Region } from './region.entity'
import { BaseEntity } from '@/shared/entities/base.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('countries')
export class Country extends BaseEntity {
  @ApiProperty({
    name: 'name',
    description: 'Unique name of the country',
    example: 'Malta',
    default: 'Malta',
  })
  @Column({ unique: true })
  name: string

  @OneToMany(() => Region, (region) => region.country)
  regions: Region[]
}
