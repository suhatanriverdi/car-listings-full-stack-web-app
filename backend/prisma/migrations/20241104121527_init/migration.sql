-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "engineType" TEXT NOT NULL,
    "engineDisplacement" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "interiorFeatures" TEXT NOT NULL,
    "safetyFeatures" TEXT NOT NULL,
    "serviceHistory" TEXT NOT NULL,
    "financingOptions" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
