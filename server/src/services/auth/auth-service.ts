import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
};

// Login User
export const loginUser = async (
  email: string,
  password: string
) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // User not found
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password with hashed password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return user;
};