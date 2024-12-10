import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

const LocationContext = createContext<string>("");

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <LocationContext.Provider value={currentPath}>
      {children}
    </LocationContext.Provider>
  );
};

export const useCurrentPath = () => {
  return useContext(LocationContext);
};
