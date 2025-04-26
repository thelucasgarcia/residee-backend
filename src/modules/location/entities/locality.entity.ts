import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Region } from './region.entity'
import { BaseEntity } from '@/shared/entities/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Country } from './country.entity'

@Entity('localities')
export class Locality extends BaseEntity {
  @ApiProperty({
    name: 'name',
    description: 'Name of the locality within a region',
    example: 'Sliema',
    default: 'Sliema',
  })
  @Column()
  name: string

  @ManyToOne(() => Country, (country) => country.regions)
  country: Country

  @ManyToOne(() => Region, (region) => region.localities)
  region: Region
}