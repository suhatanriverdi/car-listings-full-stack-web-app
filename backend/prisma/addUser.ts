import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createUser() {
  const username = 'user'; // Username
  const plainPassword = 'user'; // Plain text password
  const email = 'user@seezcarlisting.com'; // Email address (add an email)

  // Hash the password
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // 10 is the salt rounds for bcrypt.

  try {
    // Add the user to the database
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword, // Use the hashed password
        email: email, // Add the email field
      },
    });

    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}

createUser();
