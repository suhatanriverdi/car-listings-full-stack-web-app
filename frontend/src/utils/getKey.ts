import { Car } from "@/models/car";
import { PaginatedResponse } from "./PaginatedResponse";
import { ENDPOINTS } from "@/config/endpoints";
import { SortFields } from "./sortTypes";

// Define the getKey function for infinite scroll
export default function getKey(
  pageIndex: number,
  previousPageData: PaginatedResponse<Car> | null,
  sortQuery: string,
  sortField: SortFields
) {
  if (previousPageData && !previousPageData.cars) {
    return null; // No more data
  }

  // First page, we don't have `previousPageData`
  if (pageIndex === 0) {
    return `${ENDPOINTS.cars}${sortQuery}`;
  }

  // Get the cursor (if any) from previous page
  // Sorting with Cursor Based Infinite Scroll Feature
  // This will be parsed in the backend side
  // We need to send the ID of the last element in the chunk
  // And the current sort field's value
  const nextCursor =
    previousPageData && previousPageData.cars.length > 0
      ? [
          previousPageData.cars[previousPageData.cars.length - 1].id, // Last car's ID
          previousPageData.cars[previousPageData.cars.length - 1][sortField], // Last car's sort field value
        ]
      : null;

  if (!nextCursor) {
    // Last Page
    return null;
  }

  // Return the query with cursor
  // Use `?` or `&` based on whether sortQuery is empty
  const newQuery = `${ENDPOINTS.cars}${sortQuery}${sortQuery ? "&" : "?"}cursor=${nextCursor}`;
  return newQuery;
}
