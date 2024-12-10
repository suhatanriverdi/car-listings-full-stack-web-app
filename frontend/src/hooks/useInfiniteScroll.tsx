import { Car } from "@/models/car";
import { PaginatedResponse } from "@/utils/PaginatedResponse";
import { useCallback, useRef } from "react";

const useInfiniteScroll = (
  isLoading: boolean,
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<PaginatedResponse<Car>[] | undefined>
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastCarElementRef = useCallback(
    (node: HTMLElement | null) => {
      // Don't do anything if data is still loading
      // Or user is searching
      if (isLoading) {
        return;
      }
      if (observer.current) observer.current.disconnect(); // Clean up previous observer

      // Create a new IntersectionObserver
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // When the last car element is visible, load the next page
          // To Triggger SWRInfinite!
          setSize((prevSize) => prevSize + 1);
        }
      });

      if (node) observer.current.observe(node); // Start observing the new node
    },
    [isLoading] // Recreate the observer when `isLoading` changes
  );

  return { lastCarElementRef };
};

export default useInfiniteScroll;
