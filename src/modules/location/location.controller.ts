import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Public } from '../auth/guard/public.guard'
import { CountryResponseDto } from './dto/country-response.dto'
import { LocalityResponseDto } from './dto/locality-response.dto'
import { RegionResponseDto } from './dto/region-response.dto'
import { LocationService } from './location.service'

@Public()
@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly service: LocationService) { }

  @Get('countries')
  async getCountries(): Promise<CountryResponseDto[]> {
    return this.service.findAllCountries()
  }

  @Get('regions')
  async getRegions(@Query('countryId') countryId: string): Promise<RegionResponseDto[]> {
    return this.service.findRegionsByCountry(countryId)
  }

  @Get('localities')
  async getLocalities(@Query('regionId') regionId: string): Promise<LocalityResponseDto[]> {
    return this.service.findLocalitiesByRegion(regionId)
  }
}
