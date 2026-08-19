import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// POST - Create Category
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Validate required field
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Create category
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: newCategory,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error: error.message,
    });
  }
});


// GET All Categories
router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      message: "Categories fetched successfully!",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
});

export default router;