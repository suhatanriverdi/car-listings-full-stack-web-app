import CarImageSlider from "@/components/Gallery";
import CustomButton from "@/components/ui/CustomButton";
import { useCarDetailsController } from "@/controllers/carDetailsController";

export default function CarDetailsPage() {
  const {
    car,
    images,
    make,
    model,
    year,
    formattedPrice,
    engineType,
    engineDisplacement,
    power,
    transmission,
    mileage,
    interiorFeatures,
    safetyFeatures,
    serviceHistory,
    financingOptions,
    goToTradeInPage,
  } = useCarDetailsController();

  return (
    <div className="flex flex-col justify-center items-center w-full px-[2rem] sm:px-[3rem]">
      {/* Gallery Section */}
      <CarImageSlider images={images} />

      <div className="flex flex-col w-full justify-center items-center mt-[4rem] space-y-2">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl font-normal sm:text-6xl mr-[1rem] text-gray-700">{`${make}`}</h1>
          <p className="text-4xl sm:text-6xl text-gray-700">{`${model}`}</p>
        </div>
        <p className="text-2xl sm:text-3xl text-gray-700">{formattedPrice}</p>
      </div>

      <div className="place-items-center grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 gap-y-[2rem] w-full mt-[4rem]">
        <div className="flex flex-col items-center">
          <span className="font-light">Model Year</span>
          <span className="font-normal">{year}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-light">Engine Volume</span>
          <span className="font-normal">{engineDisplacement}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-light">Engine Power</span>
          <span className="font-normal">{power} hp</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-light">Fuel Type</span>
          <span className="font-normal">{engineType}</span>
        </div>
        <div className="flex flex-col items-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-1">
          <span className="font-light">Transmission</span>
          <span className="font-normal">{transmission}</span>
        </div>
        <div className="flex flex-col items-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-1">
          <span className="font-light">Mileage</span>
          <span className="font-normal">
            {mileage === 0 ? "New" : `${mileage} km`}
          </span>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="flex flex-col w-full mt-[6rem]">
        <h3 className="text-2xl font-light mb-[2rem]">
          Additional Information
        </h3>
        <div className="flex flex-col gap-[1rem]">
          <div className="flex flex-col">
            <span className="font-light">Interior Features</span>
            <span className="font-normal">{interiorFeatures}</span>
          </div>
          <div className="flex flex-col mt-3">
            <span className="font-light">Safety Features</span>
            <span className="font-normal">{safetyFeatures}</span>
          </div>
          <div className="flex flex-col mt-3">
            <span className="font-light">Service History</span>
            <span className="font-normal">{serviceHistory}</span>
          </div>
          <div className="flex flex-col mt-3">
            <span className="font-light">Financing Options</span>
            <span className="font-normal">{financingOptions}</span>
          </div>
        </div>
      </div>

      <div className="flex text-center flex-col mt-[6rem]">
        <p className="text-2xl font-light text-pretty italic">
          {'" '}
          {car.description}
          {' "'}
        </p>
      </div>

      <div className="pt-[4rem]">
        <CustomButton onClick={goToTradeInPage} children={"Trade-In"} />
      </div>
    </div>
  );
}
