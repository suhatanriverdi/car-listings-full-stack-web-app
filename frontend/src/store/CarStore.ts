import { Car } from "@/models/car";
import { create } from "zustand";

interface CarState {
  selectedCar: Car | null;
  cars: Car[]; // Array to store the list of cars
  filteredCars: Car[]; // Array to store the filtered list of cars based on search
  setSelectedCar: (car: Car) => void;
  resetSelectedCar: () => void;
  setCars: (cars: Car[]) => void; // Method to set the list of cars
  resetCars: () => void; // Method to reset the list of cars
  setFilteredCars: (filteredCars: Car[]) => void; // Method to set the filtered list of cars
  resetFilteredCars: () => void; // Method to reset the filtered list
}

const useCarStore = create<CarState>((set) => {
  const storedCar = localStorage.getItem("selectedCar");
  const initialState = storedCar ? JSON.parse(storedCar) : null;

  // Start with empty arrays for cars and filteredCars
  return {
    selectedCar: initialState,
    cars: [], // Initialize as empty array, since we'll fetch cars later
    filteredCars: [], // Initialize as empty array as well
    setSelectedCar: (car) => {
      set({ selectedCar: car });
      localStorage.setItem("selectedCar", JSON.stringify(car)); // Store selected car in localStorage
    },
    resetSelectedCar: () => {
      set({ selectedCar: null });
      localStorage.removeItem("selectedCar"); // Clear selected car from localStorage
    },
    setCars: (cars) => {
      set({ cars, filteredCars: cars }); // When cars are set, also set filteredCars to all cars
    },
    resetCars: () => {
      set({ cars: [], filteredCars: [] }); // Reset both cars and filteredCars to empty arrays
    },
    setFilteredCars: (filteredCars) => {
      set({ filteredCars }); // Update only the filteredCars state
    },
    resetFilteredCars: () => {
      set({ filteredCars: [] }); // Reset filteredCars back to an empty array
    },
  };
});

export default useCarStore;
