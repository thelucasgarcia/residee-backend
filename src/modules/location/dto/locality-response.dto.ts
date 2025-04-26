import { Locality } from '@/modules/location/entities/locality.entity';
import { PickType } from '@nestjs/swagger';

export class LocalityResponseDto extends PickType(Locality, [
  'id',
  'name',
  'region'
]) { }