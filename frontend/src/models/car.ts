export interface Car {
  id: number; // The unique ID of the car
  make: string; // The manufacturer of the car
  model: string; // The model of the car
  year: number; // The year of manufacture
  price: number; // The sale price of the car
  formattedPrice: string; // The formatted sale price ($10,000.00) of the car
  engineType: string; // Type of engine (gasoline, diesel, etc.)
  engineDisplacement: string; // Engine displacement
  power: number; // Engine power (in horsepower)
  transmission: string; // Type of transmission (manual or automatic)
  mileage: number; // Total distance traveled
  imageUrl: string; // URL for the car's image
  interiorFeatures: string; // Features of the interior
  safetyFeatures: string; // Safety features
  serviceHistory: string; // Service history
  financingOptions: string; // Financing options available
  description: string; // More information about the car
}

// Example car data
// const exampleCar: Car = {
//   make: "Porsche",
//   model: "911",
//   year: 2021,
//   price: 99999,
//   engineType: "Gasoline",
//   engineDisplacement: "3.0 L",
//   power: 450,
//   transmission: "Automatic",
//   mileage: 12000,
//   imageUrl: "https://example.com/image1.jpg",
//   interiorFeatures: "Leather seats, premium sound system",
//   safetyFeatures: "Airbags, ABS, stability control",
//   serviceHistory: "Full service history available",
//   financingOptions: "Financing available through dealership",
// };
