import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearCarsTable() {
  try {
    await prisma.car.deleteMany();
    console.log('Cars have been removed.');
  } catch (error) {
    console.error('Cars could not be removed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearCarsTable();
