export const years = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, index) => (1900 + index).toString()
).reverse();

type CarData = {
  make: string;
  models: string[];
};

const carData: CarData[] = [
  { make: "Audi", models: ["A3", "A4", "A6", "Q7"] },
  { make: "BMW", models: ["X1", "X3", "X5"] },
  { make: "Mercedes", models: ["C-Class", "E-Class", "S-Class", "GLE"] },
  { make: "Porsche", models: ["911", "Macan"] },
  { make: "Aston", models: ["DB12"] },
  { make: "Ford", models: ["Mustang", "Explorer", "F-150", "Maverick"] },
  { make: "Tesla", models: ["Model S", "Model X"] },
  {
    make: "Chevrolet",
    models: ["Corvette", "Tahoe", "Silverado 1500", "Colorado"],
  },
  { make: "Nissan", models: ["Altima", "Rogue", "Titan", "Kicks"] },
  { make: "Volkswagen", models: ["Golf", "Tiguan"] },
  { make: "Subaru", models: ["Outback", "Forester"] },
  { make: "Hyundai", models: ["Elantra", "Santa Cruz", "Tucson"] },
  { make: "Kia", models: ["K5", "Soul", "Telluride", "Seltos"] },
  { make: "Mazda", models: ["CX-5", "CX-30"] },
  { make: "Lexus", models: ["RX 350"] },
  { make: "Chrysler", models: ["Pacifica", "Voyager"] },
  { make: "Dodge", models: ["Durango"] },
  { make: "Jaguar", models: ["F-PACE"] },
  { make: "Volvo", models: ["XC90"] },
  { make: "Land Rover", models: ["Discovery", "Range Rover"] },
  { make: "Fiat", models: ["500"] },
  { make: "Acura", models: ["RDX"] },
  { make: "Infiniti", models: ["QX60"] },
  { make: "Mitsubishi", models: ["Outlander"] },
  { make: "Genesis", models: ["GV80"] },
  { make: "Honda", models: ["CR-V", "Accord", "Pilot", "Ridgeline"] },
  { make: "Toyota", models: ["RAV4", "Camry", "Tundra", "Highlander"] },
  { make: "Ram", models: ["1500", "2500"] },
  { make: "GMC", models: ["Sierra 1500"] },
];

export const getCarMakes = () => carData.map((car) => car.make);

export const getCarModelsByMake = (make: string) => {
  const car = carData.find((car) => car.make === make);
  return car ? car.models : [];
};

// Types
export type MileageOption = {
  label: string;
  value: string;
};

export type TransmissionOption = {
  label: string;
  value: "manual" | "automatic";
};

export type FuelTypeOption = {
  label: string;
  value: "gasoline" | "diesel" | "electric";
};

// Mileage Options
export const getMileageOptions = (): MileageOption[] => [
  { label: "0 km", value: "0" },
  { label: "5,000 km", value: "5000" },
  { label: "10,000 km", value: "10000" },
  { label: "20,000 km", value: "20000" },
  { label: "30,000 km", value: "30000" },
  { label: "40,000 km", value: "40000" },
  { label: "50,000 km", value: "50000" },
  { label: "60,000 km", value: "60000" },
  { label: "70,000 km", value: "70000" },
  { label: "80,000 km", value: "80000" },
  { label: "90,000 km", value: "90000" },
  { label: "100,000 km", value: "100000" },
  { label: "120,000 km", value: "120000" },
  { label: "150,000 km", value: "150000" },
  { label: "200,000 km", value: "200000" },
  { label: "250,000+ km", value: "250000" },
];

// Transmission Options
export const getTransmissionOptions = (): TransmissionOption[] => [
  { label: "Manual", value: "manual" },
  { label: "Automatic", value: "automatic" },
];

// Fuel Type Options
export const getFuelTypeOptions = (): FuelTypeOption[] => [
  { label: "Gasoline", value: "gasoline" },
  { label: "Diesel", value: "diesel" },
  { label: "Electric", value: "electric" },
];
