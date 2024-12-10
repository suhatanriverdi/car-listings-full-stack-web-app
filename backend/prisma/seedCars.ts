import { PrismaClient } from '@prisma/client';
import Cars from '../prisma/CarsMockData';

const prisma = new PrismaClient();

async function initializeCars() {
  try {
    await prisma.car.createMany({ data: Cars });
    console.log('Cars have been initialized.');
  } catch (error) {
    console.error('Cars could not be initialized:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeCars();
