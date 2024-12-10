# 🚗 Car Listings Application

<img width="1600" alt="main" src="https://github.com/user-attachments/assets/619b5b2b-2560-429a-a9df-43e7db6f95ad">
<hr>
<img width="307" alt="Screenshot 2024-11-10 at 22 49 00" src="https://github.com/user-attachments/assets/25e54ee1-c4e9-4c9b-8833-5fdcd0b428bf">

## 📚 Overview

The **Car Listings Application** is a full-stack web application designed to allow users to browse and interact with car listings. Users can view detailed specifications of cars and apply for trade-ins.

This app uses **React**, **TypeScript**, and **Tailwind CSS** for the frontend, and a **Node.js API** with **PostgreSQL** for backend functionality.

You can see the **screenshots** from the desktop and mobile at the bottom.

## 🚀 Live Preview

You can have a look at the live preview link:
## [Live Preview Link](https://vite-react-kohl-six.vercel.app/)

### 🖥️ Figma Design

Check out the complete UI design in Figma:  
[Figma UI Design](https://www.figma.com/design/Oa9b1I044hr1zVFbPMU3Sk/Car-Listing?node-id=0-1&t=MQ4d7wsJO94AJo9x-1)

## 🛠️ Features

- **🚗 Car Listings**: View detailed pages for each car listing, including make, model, images, and specifications.
- **🔄 Trade-In Application**: Users can apply for a trade-in directly from the car's details page.
- **📝 Form Submission**: The trade-in form accepts essential vehicle information (make, model, year, mileage) and allows image uploads.
- **✅ Form Validation**: Backend and frontend form validation powered by **Zod**.
- **🔐 Authentication/Login**: Secure login with **JWT** for user authentication.
- **💡 User Experience Enhancements**: Clean, user-friendly design elements for improved usability.
- **📦 Mocked Data**: The app uses mocked data for demonstration, hosted in memory.
- **🔢 Sorting & Cursor-based Infinite Scroll**: Sort car listings by price, year, and mileage while using infinite scrolling.
- **🔍 Search Functionality**: Search for cars by make and model.
- **🔄 Infinite Scrolling**: The car listing page supports infinite scrolling, loading additional cars as the user scrolls down.

## 🛠️ Technologies Used

### 🖥️ Frontend

- **React** 📦
- **TypeScript** 🖋️
- **Figma** for Complete Design 🎨
- **Tailwind CSS** for a fully responsive design across different devices 📱💻
- **Framer Motion** & **Swiper** for animations 🎞️
- **React Hook Form** for form handling 📝
- **Zod** for form validation 🔒
- **Axios** for HTTP requests 🌐

### 🔙 Backend

- **Node.js** 🟢
- **NestJS** 🐦
- **Prisma ORM** 🔗
- **PostgreSQL** 🗄️

## 📂 Folder Structure

### Backend Folder Structure

```plaintext
backend/
├── .env
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma/
├── src/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth/
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.middleware.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.spec.ts
│   │   └── auth.service.ts
│   ├── cars/
│   │   ├── cars.controller.ts
│   │   ├── cars.module.ts
│   │   ├── cars.service.ts
│   │   └── cars.types.ts
│   ├── trade-in/
│   │   ├── trade-in.controller.ts
│   │   ├── trade-in.module.ts
│   │   └── trade-in.service.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.service.spec.ts
│   │   └── users.service.ts
│   ├── utils/
│   │   └── dollarFormatter.ts
│   └── main.ts
├── test/
└── tsconfig.build.json

Frontend Folder Structure

frontend/
├── .gitignore
├── index.css
├── main.tsx
├── package.json
├── vite-env.d.ts
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx
│   │   ├── Navbar.tsx
│   │   ├── Toast.tsx
│   │   ├── Topbar.tsx
│   │   ├── TradeInForm.tsx
│   │   └── ui/
│   │       ├── CarBrandIcon.tsx
│   │       ├── CustomButton.tsx
│   │       ├── EngineTypeIcon.tsx
│   │       ├── ScrollToTop.tsx
│   │       └── SortDropdown.tsx
│   ├── config/
│   │   └── endpoints.ts
│   ├── containers/
│   │   └── CarList.tsx
│   ├── controllers/
│   │   ├── carController.tsx
│   │   ├── carDetailsController.tsx
│   │   ├── loginFormController.tsx
│   │   └── tradeInFormController.tsx
│   ├── hooks/
│   │   └── useInfiniteScroll.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── models/
│   │   └── car.ts
│   ├── services/
│   │   └── providers/
│   │       ├── LocationProvider.tsx
│   │       └── RouteChangeProvider.tsx
│   ├── store/
│   │   ├── CarStore.ts
│   │   ├── FormStore.ts
│   │   ├── LoginStore.ts
│   │   ├── SearchQueryStore.ts
│   │   └── SortQueryStore.ts
│   ├── utils/
│   └── views/
└── tsconfig.json

🗄️ Database Structure

The database is powered by PostgreSQL and managed using Prisma. The key models include:

1. 🚗 Car

	•	Stores details about each car listing, including make, model, year, price, engine type, and more.
	•	Relation with TradeIn.

2. 👤 User

	•	Represents users, storing their credentials (username, email, password).
	•	Relation with TradeIn.

3. 🔄 TradeIn

	•	Stores information about user trade-in applications, including car details, status (pending, accepted, rejected), and images.
	•	Relation with User and Car.

model Car {
  id                 Int       @id @default(autoincrement())
  make               String
  model              String
  year               Int
  price              Float
  engineType         String
  engineDisplacement String
  power              Int
  transmission       String
  mileage            Int
  imageUrl           String
  interiorFeatures   String
  safetyFeatures     String
  serviceHistory     String
  financingOptions   String
  description        String
  TradeIn            TradeIn[]
}

model User {
  id        Int       @id @default(autoincrement())
  username  String    @unique
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  tradeIns  TradeIn[]
}

model TradeIn {
  id               Int      @id @default(autoincrement())
  fullName         String
  phone            String
  email            String
  make             String
  model            String
  status           String   @default("PENDING")
  year             Int
  mileage          Int
  imageUrls        String[]
  transmission     String
  fuelType         String
  interiorFeatures String?
  safetyFeatures   String?
  serviceHistory   String?
  userId           Int // Foreign key to User
  user             User     @relation(fields: [userId], references: [id])
  carId            Int // Foreign key to Car
  car              Car      @relation(fields: [carId], references: [id])
  createdAt        DateTime @default(now())
}
```

## 📸 Screenshots from Desktop

[Go to Screenshots Section](#screenshots-from-desktop)

<img width="1600" alt="main" src="https://github.com/user-attachments/assets/619b5b2b-2560-429a-a9df-43e7db6f95ad">
<hr>
<img width="300" alt="Screenshot 2024-11-10 at 22 36 02" src="https://github.com/user-attachments/assets/b15b7ceb-36e6-4e70-9abc-c13d071936c0">
<hr>
<img width="900" alt="Screenshot 2024-11-10 at 22 37 14" src="https://github.com/user-attachments/assets/9335cab4-12fb-4b58-b3eb-13e6a47ea653">
<hr>
<img width="900" alt="Screenshot 2024-11-10 at 22 36 11" src="https://github.com/user-attachments/assets/e6c7dbe1-16c4-4948-ad2d-10a55e848540">
<hr>
<img width="900" alt="Screenshot 2024-11-10 at 22 37 53" src="https://github.com/user-attachments/assets/d8568498-0818-4c9b-abf3-7813141dda44">
<hr>
<img width="900" alt="Screenshot 2024-11-10 at 22 38 00" src="https://github.com/user-attachments/assets/58bad7e2-0312-40f0-9978-3830c9dfea57">
<hr>
<img width="900" alt="Screenshot 2024-11-10 at 22 38 57" src="https://github.com/user-attachments/assets/4bd4cd3f-df18-4382-9d84-784dc499fcbd">
<hr>
<img width="400" alt="Screenshot 2024-11-10 at 22 38 16" src="https://github.com/user-attachments/assets/36e6bac7-4865-4a11-a2b5-4ea93e48f1bb">
<hr>
<img width="900" alt="Screenshot 2024-11-10 at 22 37 28" src="https://github.com/user-attachments/assets/e0f68a3f-a121-41de-8ef7-55f87780931d">
<hr>

## Screenshots from Mobile Devices
<img width="307" alt="Screenshot 2024-11-10 at 22 49 00" src="https://github.com/user-attachments/assets/25e54ee1-c4e9-4c9b-8833-5fdcd0b428bf">
<img width="309" alt="Screenshot 2024-11-10 at 22 49 17" src="https://github.com/user-attachments/assets/ad2e7ccd-f25d-4602-a3d3-ae007f2e2267">
<img width="337" alt="Screenshot 2024-11-10 at 22 50 56" src="https://github.com/user-attachments/assets/036f4611-6f8b-4c13-817c-d82158f883ed">
<img width="334" alt="Screenshot 2024-11-10 at 22 50 49" src="https://github.com/user-attachments/assets/c3b08c42-43db-4495-a99c-4d7d4986c120">
<img width="312" alt="Screenshot 2024-11-10 at 22 49 58" src="https://github.com/user-attachments/assets/d636f387-9691-4cbb-b40e-81709d3c416a">
<img width="311" alt="Screenshot 2024-11-10 at 22 49 51" src="https://github.com/user-attachments/assets/7b6a3caf-4b99-428c-af92-81f10cd52287">
<img width="310" alt="Screenshot 2024-11-10 at 22 49 45" src="https://github.com/user-attachments/assets/abd1aa24-f37a-4531-8618-ec4e717678fd">
<img width="309" alt="Screenshot 2024-11-10 at 22 49 37" src="https://github.com/user-attachments/assets/d06c4bb7-b259-4c2e-a0b3-4b9e01e04c11">
<img width="310" alt="Screenshot 2024-11-10 at 22 49 31" src="https://github.com/user-attachments/assets/0415e398-394d-4e54-83d7-c52cca187e1c">
<img width="309" alt="Screenshot 2024-11-10 at 22 49 25" src="https://github.com/user-attachments/assets/906f7c4e-bfec-4692-87e4-f7662c1ae29a">
<img width="312" alt="Screenshot 2024-11-10 at 22 49 06" src="https://github.com/user-attachments/assets/fe35388a-8c32-4afa-8367-776586027bd2">

