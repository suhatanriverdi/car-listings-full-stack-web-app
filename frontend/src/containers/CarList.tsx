import { Car } from "../models/car";
import useCarController from "../controllers/carController";
import MileageIcon from "../../public/svgs/MileageIcon";
import TransmissionIcon from "../../public/svgs/TransmissionIcon";
import EngineTypeIcon from "@/components/ui/EngineTypeIcon";

export default function CarList() {
  // Car Controller
  const {
    filteredCars: cars,
    error,
    isLoading,
    lastCarElementRef,
    goToCarDetails,
  } = useCarController();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cars.</div>;
  }

  if (!cars) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car: Car, index) => (
        <div
          ref={cars.length === index + 1 ? lastCarElementRef : null}
          key={car.id}
          className="bg-card-bg cursor-pointer rounded-[20px] p-[1rem] transition-transform duration-50 hover:bg-lime-100 hover:scale-[0.99]"
          onClick={() => goToCarDetails(car)}
        >
          <div className="flex justify-between">
            <div className="flex justify-center items-start">
              <p className="text-[18px] font-normal min-w-max text-gray-700 mr-[0.4rem]">
                {car.make}
              </p>
              <p className="text-[18px] w-full max-w-[6.5rem] truncate text-gray-700">
                {car.model}
              </p>
            </div>
            <p className="font-normal truncate text-gray-700 text-[18px]">
              {car.formattedPrice}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[14px]">{car.year}</p>
          </div>
          <img
            src="/images/gray.png"
            alt={`${car.make} ${car.model}`}
            className="object-cover py-[18px]"
          />
          <div className="flex justify-between">
            <div className="flex justify-between items-center">
              <TransmissionIcon />
              <p className="ml-[5px]">{car.transmission}</p>
            </div>
            <div className="flex justify-between items-center">
              <EngineTypeIcon engineType={car.engineType} />
              <p className="ml-[5px]">{car.engineType}</p>
            </div>
            <div className="flex justify-between items-center">
              <MileageIcon />
              <p className="ml-[5px]">
                {car.mileage === 0 ? "New" : `${car.mileage} hp`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
