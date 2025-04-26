import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Region } from './entities/region.entity';
import { Locality } from './entities/locality.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, Region, Locality]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule { }
