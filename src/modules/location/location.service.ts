import { Country } from '@/modules/location/entities/country.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryResponseDto } from './dto/country-response.dto';
import { LocalityResponseDto } from './dto/locality-response.dto';
import { RegionResponseDto } from './dto/region-response.dto';
import { Locality } from './entities/locality.entity';
import { Region } from './entities/region.entity';
import { CountryNotFoundException } from '@/shared/exceptions/country-not-found.exception';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Country)
    private countryRepo: Repository<Country>,

    @InjectRepository(Region)
    private regionRepo: Repository<Region>,

    @InjectRepository(Locality)
    private localityRepo: Repository<Locality>,
  ) { }

  async findAllCountries(): Promise<CountryResponseDto[]> {
    const countries = await this.countryRepo.find({
      relations: ['regions']
    })
    return countries
  }

  async findRegionsByCountry(countryId: string): Promise<RegionResponseDto[]> {
    const country = await this.countryRepo.findOne({ where: { id: countryId } })

    if (!country) {
      throw new CountryNotFoundException()
    }

    const regions = await this.regionRepo.find({
      where: {
        country: {
          id: countryId
        }
      },
    })
    return regions
  }

  async findLocalitiesByRegion(regionId: string): Promise<LocalityResponseDto[]> {
    const localities = await this.localityRepo.find({
      where: { region: { id: regionId } },
      relations: ['region'],
    })
    return localities
  }
}
