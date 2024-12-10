import { useCurrentPath } from "./LocationProvider";
import useCarStore from "@/store/CarStore";
import useFormStore from "@/store/FormStore";
import useLoginStore from "@/store/LoginStore";
import { useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface RouteChangeProviderProps {
  children: ReactNode;
}

const RouteChangeContext = createContext({});

const RouteChangeProvider = ({ children }: RouteChangeProviderProps) => {
  const currentPath = useCurrentPath();
  const { resetSelectedCar } = useCarStore();
  const { resetToast, toastType } = useFormStore();
  const { isLoggedIn } = useLoginStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && currentPath === "/trade") {
      navigate("/login", { replace: true });
    }
    // TODO, burası /login yazınca gitmemesini sağlıyordu
    // Ama aynı zamanda login sayfasından login olunca
    // Success yazısını da hmen kapanmasına sebep oluyor!
    if (isLoggedIn && currentPath === "/login" && toastType === null) {
      navigate("/", { replace: true });
    }
  }, [currentPath, isLoggedIn, navigate]);

  useEffect(() => {
    if (currentPath === "/") {
      resetSelectedCar();
    }
    resetToast();
  }, [currentPath, resetSelectedCar, resetToast]);

  return (
    <RouteChangeContext.Provider value={{}}>
      {children}
    </RouteChangeContext.Provider>
  );
};

export { RouteChangeProvider, RouteChangeContext };
