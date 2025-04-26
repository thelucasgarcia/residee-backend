import { Country } from '@/modules/location/entities/country.entity'
import { Locality } from '@/modules/location/entities/locality.entity'
import { Region } from '@/modules/location/entities/region.entity'
import { BaseEntity } from '@/shared/entities/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  ManyToOne
} from 'typeorm'

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  STUDIO = 'STUDIO',
  PENTHOUSE = 'PENTHOUSE',
  ROOM = 'ROOM',
  COMMERCIAL = 'COMMERCIAL',
}

@Entity('properties')
export class Property extends BaseEntity {
  @ManyToOne(() => Country)
  @ApiProperty({ type: () => Country })
  country: Country

  @ManyToOne(() => Locality)
  @ApiProperty({ type: () => Locality })
  locality: Locality

  @Column()
  @ApiProperty({ example: 'Triq il-Kbira' })
  street: string

  @Column()
  @ApiProperty({ example: '123' })
  number: string

  @Column({ nullable: true })
  @ApiProperty({ example: 'NX10000' })
  referenceNumber: string

  @Column({ nullable: true })
  @ApiProperty({ example: 'NXR 1234', required: false })
  postalCode?: string

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ example: 35.8998, required: false })
  latitude?: number

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ example: 14.5146, required: false })
  longitude?: number

  @Column({ type: 'enum', enum: PropertyType })
  @ApiProperty({ enum: PropertyType, example: 'APARTMENT' })
  type: PropertyType

  @Column()
  @ApiProperty({ example: 3 })
  bedrooms: number

  @Column()
  @ApiProperty({ example: 2 })
  bathrooms: number

  @Column({ nullable: true })
  @ApiProperty({ example: 1 })
  suiteBathrooms: number

  @Column({ type: 'float' })
  @ApiProperty({ example: 95.5, description: 'Total area in square meters' })
  area: number

  @Column({ nullable: true })
  @ApiProperty({ example: 1, required: false })
  parkingSpaces: number

}
