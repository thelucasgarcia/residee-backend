import { Region } from '@/modules/location/entities/region.entity';
import { PickType } from '@nestjs/swagger';

export class RegionResponseDto extends PickType(Region, [
  'id',
  'name',
  'country',
  'localities',
]) { }