import { Controller, Get, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { SortFields, SortOrder } from './cars.types';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  listAll(
    @Query('sortField') sortField: SortFields,
    @Query('sortOrder') sortOrder: SortOrder,
    @Query('limit') limit: string,
    @Query('cursor') cursor?: string,
  ) {
    return this.carsService.getCars(sortField, sortOrder, limit, cursor);
  }
}
