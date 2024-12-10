import useSWRInfinite from "swr/infinite";
import { fetcher } from "../utils/fetcher";
import useCarStore from "@/store/CarStore";
import { useEffect, useMemo } from "react";
import { useSortStore } from "@/store/SortQueryStore";
import { PaginatedResponse } from "@/utils/PaginatedResponse";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useNavigate } from "react-router-dom";
import { Car } from "@/models/car";
import getKey from "@/utils/getKey";
import { useSearchQueryStore } from "@/store/SearchQueryStore";

const useCarController = () => {
  const navigate = useNavigate();
  const { setSelectedCar, setCars, filteredCars } = useCarStore();
  const { searchQuery } = useSearchQueryStore();

  // Sort Query
  const { sortField, sortOrder } = useSortStore();
  const sortQuery =
    sortOrder !== "" ? `?sortField=${sortField}&sortOrder=${sortOrder}` : "";

  // Only fetch cars with cursor based infinite scroll only if searchQuery is empty
  const { data, error, isLoading, setSize } = useSWRInfinite<
    PaginatedResponse<Car>
  >((pageIndex, previousPageData) => {
    // Skip fetching if there's a search query
    if (searchQuery !== "") {
      return null;
    }
    return getKey(pageIndex, previousPageData, sortQuery, sortField);
  }, fetcher);

  // Use the Intersection Observer API for Infinite Scroll
  const { lastCarElementRef } = useInfiniteScroll(isLoading, setSize);

  // TODO
  // Memoize the flattened list of cars to avoid recalculating on every render
  const cars = useMemo(() => {
    return data ? data.flatMap((page) => page.cars) : [];
  }, [data]);

  useEffect(() => {
    if (cars && cars.length > 0) {
      // Update car store with all fetched cars
      setCars(cars);
    }
  }, [cars]);

  const goToCarDetails = (car: Car) => {
    setSelectedCar(car);
    navigate(`/details/${car.id}`, { state: { car } });
  };

  return {
    filteredCars,
    error,
    isLoading,
    lastCarElementRef,
    goToCarDetails,
  };
};

export default useCarController;
