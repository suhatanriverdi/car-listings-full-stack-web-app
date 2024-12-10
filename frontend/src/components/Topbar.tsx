import SearchIcon from "../../public/svgs/SearchIcon";
import useCarStore from "@/store/CarStore";
import CarBrandIcon from "./ui/CarBrandIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentPath } from "@/services/providers/LocationProvider";
import { ChangeEvent, useEffect } from "react";
import SortDropdown from "./ui/SortDropDown";
import { useSortStore } from "@/store/SortQueryStore";
import { SortFields, SortOrder } from "@/utils/sortTypes";
import { useSearchQueryStore } from "@/store/SearchQueryStore";

export default function Topbar() {
  // Hook to track the current location
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedCar, cars, filteredCars, setFilteredCars } = useCarStore();
  const { setSortQuery } = useSortStore();

  const { searchQuery, setSearchQuery, resetSearchQuery } =
    useSearchQueryStore();

  // Update the query parameters for sorting
  const handleSortQueryChange = (field: string, order: string) => {
    // Update the sort state
    setSortQuery(field as SortFields, order as SortOrder);
    // If while typing search text, user clicks sort, reset search query
    resetSearchQuery();
  };

  // Reset searchQuery on route change
  useEffect(() => {
    resetSearchQuery(); // Reset search query whenever the route changes
    // resetSortQuery(); // TODO We might want this?
  }, [location]); // This effect runs whenever the location changes

  // Filter cars based on search query
  useEffect(() => {
    if (searchQuery === "") {
      // Reset filteredCars to all cars if searchQuery is empty
      setFilteredCars(cars); // Setting filteredCars back to the full list of cars
    } else {
      // Filter cars based on search query
      const filteredCars = cars.filter(
        (car) =>
          car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCars(filteredCars);
    }
  }, [searchQuery]);

  // Go to previous page
  const handleBack = () => {
    navigate(-1);
  };

  // Remove the Topbar on LogIn page
  const pathname = useCurrentPath();
  if (pathname === "/login") {
    return <></>;
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (pathname === "/" && selectedCar === null) {
    return (
      <div className="flex sticky z-[2] top-[4rem] sm:top-[100px] h-[3rem] bg-white bg-opacity-85 backdrop-blur-md w-full justify-center items-center">
        <div className="flex justify-end items-center px-[2rem] sm:px-[3rem] max-w-[62rem] w-full">
          <div className="flex w-full justify-end items-center h-[30px]">
            <div className="flex justify-center items-center">
              <div className="flex w-[11rem] justify-center items-center">
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border rounded-2xl px-[0.4rem] pt-[0.5rem] pb-[0.4rem] pl-[1rem] hover:border-button-bg-dark w-full focus:outline-none focus:border-button-bg-dark focus:ring-button-bg-dark"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-button-bg-dark">
                    <SearchIcon />
                  </div>
                </div>
              </div>

              {/* Display number of results */}
              <div className="flex justify-center items-center text-nowrap w-[5rem] mr-[0.75rem]">
                {<span className="text-sm">{filteredCars.length} results</span>}
              </div>

              <SortDropdown onSortQueryChange={handleSortQueryChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pathname === "/trade" || pathname.includes("details")) {
    return (
      <div className="flex sticky z-[2] top-[4rem] sm:top-[100px] h-[3rem] bg-white bg-opacity-85 backdrop-blur-md w-full justify-center items-center">
        <div className="flex justify-between items-center gap-10 px-[2rem] sm:px-[3rem] max-w-[62rem] w-full">
          <span
            className="cursor-pointer hover:text-button-bg-dark"
            onClick={handleBack}
          >
            {"< Back"}
          </span>
          {selectedCar !== null && (
            <CarBrandIcon h={3} w={3} make={selectedCar.make} />
          )}
        </div>
      </div>
    );
  }
}
