import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";
import { loginUser, registerUser } from "./auth/auth-service";

const router = Router();

// POST - Create users
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const user = await registerUser(name, email, password);

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    if (error.message === "User already exists with this email") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
});

// POST - Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    if (error.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
});


// GET All users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
});

export default router;