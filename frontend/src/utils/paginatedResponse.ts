export interface PaginatedResponse<T> {
  cars: T[];
  nextCursor: string | null;
}
