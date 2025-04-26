import { PickType } from '@nestjs/swagger';
import { Country } from '../entities/country.entity';

export class CountryResponseDto extends PickType(Country, [
  'id',
  'name',
  'regions'
]) { }