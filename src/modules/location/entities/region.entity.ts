import { Country } from '@/modules/location/entities/country.entity';
import { BaseEntity } from '@/shared/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Locality } from './locality.entity';


@Entity('regions')
export class Region extends BaseEntity {
  @ApiProperty({
    name: 'name',
    description: 'Name of the region within the country',
    example: 'Northern Region',
    default: 'Northern Region',
  })
  @Column()
  name: string

  @ManyToOne(() => Country, (country) => country.regions)
  country: Country

  @OneToMany(() => Locality, (locality) => locality.region)
  localities: Locality[]
}