import { useNavigate, useLocation } from "react-router-dom";
import { Car } from "@/models/car";
import getCarImagePaths from "@/utils/getCarImagePaths";
import useLoginStore from "@/store/LoginStore";
import useFormStore from "@/store/FormStore";

export const useCarDetailsController = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useLoginStore();
  const { setToast } = useFormStore();

  // Extract the car data from the location state
  const { car } = location.state as { car: Car };

  // Temporary mock images
  const images = getCarImagePaths();

  // Destructuring the car object for easy access
  const {
    id: carId,
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
    description,
  } = car;

  // Function to navigate to the trade-in page with the car data
  const goToTradeInPage = () => {
    if (!isLoggedIn) {
      setToast("You should log in first! Redirecting to Login...", "info");
      // navigate("/login");
    } else {
      navigate("/trade", { state: { carId, userId } });
    }
  };

  return {
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
    description,
    goToTradeInPage,
  };
};
