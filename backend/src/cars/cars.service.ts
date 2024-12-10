import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { dollarFormatter } from '../utils/dollarFormatter';
import { SortFields, SortOrder } from './cars.types';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  formatCarPrice(price: number): string {
    return dollarFormatter(price);
  }

  cursorBasedInfiniteScroll(
    sortOrder: SortOrder,
    sortField: SortFields,
    cursorStr?: string,
  ): any[] {
    // Initial Case where no cursor is provided
    if (!cursorStr) {
      return [undefined, {}];
    }

    // Parse Cursor String
    const [lastIdString, lastSortFieldValueString] = cursorStr.split(',');

    // Check if both parts of the cursor are present
    if (!lastIdString || !lastSortFieldValueString) {
      throw new Error('Invalid cursor format');
    }

    // Convert lastId to an integer and check if it's a valid number
    const lastId = parseInt(lastIdString, 10);
    if (isNaN(lastId)) {
      throw new Error('Invalid ID in cursor');
    }

    // Convert lastSortFieldValue to a float and check if it's a valid number
    const lastSortFieldValue = parseFloat(lastSortFieldValueString);
    if (isNaN(lastSortFieldValue)) {
      throw new Error('Invalid sort field value in cursor');
    }

    // Determine whether the sort order is ascending or descending
    const isAscending = sortOrder === 'asc';

    // Set the correct operator based on sort direction
    const operator = isAscending ? 'gte' : 'lte';

    // Needed for Cursor based pagination with arbitrary ordering
    // If there is a sortField (after the first request)
    // Create the where condition dynamically based on sort order
    const whereCondition = {
      [sortField]: { [operator]: lastSortFieldValue },
    };

    return [lastId, whereCondition];
  }

  // If Sorting is enabled, use this funtion
  async withSorting(
    limit: number,
    sortField: SortFields,
    sortOrder: SortOrder,
    cursorStr?: string,
  ) {
    // Apply sorting
    const orderBy: Prisma.CarOrderByWithRelationInput[] = [
      { [sortField]: sortOrder }, // Sort by the dynamic field
      { id: 'asc' }, // Stable sort by id
    ];

    // Parse Cursor String
    const [lastId, whereCondition] = this.cursorBasedInfiniteScroll(
      sortOrder,
      sortField,
      cursorStr,
    );

    const cars = await this.prisma.car.findMany({
      take: limit,
      cursor: lastId ? { id: lastId } : undefined,
      skip: lastId ? 1 : 0, // Do not include the current cursor's value
      where: whereCondition,
      orderBy,
    });

    const nextId = cars.length > 0 ? cars[cars.length - 1].id : null;

    const nextFieldValue =
      cars.length > 0 && sortField ? cars[cars.length - 1][sortField] : null;

    const nextCursor = [
      nextId && nextId,
      nextFieldValue ? nextFieldValue : null,
    ];

    return {
      cars: cars.map((car) => ({
        ...car,
        formattedPrice: this.formatCarPrice(car.price),
      })),
      nextCursor,
    };
  }

  // If no sorting option is set, use this function
  async noSortingRegularScroll(numLimit: number, cursorStr?: string) {
    // Parse Cursor String
    const cursor = cursorStr ? cursorStr.split(',')[0] : undefined;

    // Convert cursor and limit to numbers
    const numCursor = parseInt(cursor, 10);

    // Fetch all cars
    const cars = await this.prisma.car.findMany({
      take: numLimit,
      cursor: cursor ? { id: numCursor } : undefined,
      where: cursor ? { id: { gt: numCursor } } : {},
    });

    const nextCursor = [
      cars.length > 0 ? cars[cars.length - 1].id : null,
      null,
    ];

    return {
      cars: cars.map((car) => ({
        ...car,
        formattedPrice: this.formatCarPrice(car.price),
      })),
      nextCursor,
    };
  }

  async getCars(
    sortField: SortFields,
    sortOrder: SortOrder = '',
    limitStr: string = '15',
    cursorStr?: string,
  ) {
    // Convert cursor and limit to numbers
    const limit = parseInt(limitStr, 10);

    // If no sorting option, call noSortingRegularScroll()
    if (sortOrder === '') {
      return await this.noSortingRegularScroll(limit, cursorStr);
    }

    // If sorting option is set, call withSorting()
    return await this.withSorting(limit, sortField, sortOrder, cursorStr);
  }
}
