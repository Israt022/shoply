import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";


const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      image,
      categoryId,
      userId,
    } = req.body;

    if (!title || !price || stock === undefined || !categoryId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Title, price, stock, categoryId, and userId are required",
      });
    }

    // Validate price and stock
    if (price <= 0 || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be positive and stock cannot be negative",
      });
    }

    // Check category
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        stock,
        image,
        categoryId,
        userId,
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
});

// GET All Products
router.get("/", async (req, res) => {
  try {
    const data = await prisma.product.findMany({
      where: {
        isDeleted: false,
      },
    });

    res.json({
      success: true,
      message: "Products fetched successfully!",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

// GET - Product by ID
router.get("/:id", async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving product",
      error: error.message,
    });
  }
});

// PUT - Update Product
router.put("/:id", async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      price,
      stock,
      image,
      categoryId,
    } = req.body;

    // Check product exists
    const existingProduct = await prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Validate price
    if (price !== undefined && price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be positive",
      });
    }

    // Validate stock
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    // Check category if categoryId is being updated
    if (categoryId !== undefined) {
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(stock !== undefined && { stock }),
        ...(image !== undefined && { image }),
        ...(categoryId !== undefined && { categoryId }),
      },
      include: {
        category: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
});

// DELETE - Product
router.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const existingProduct = await prisma.product.findFirst({
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Product + related Wishlists soft delete
      const [deletedProduct] = await prisma.$transaction([
        prisma.product.update({
          where: {
            id,
          },
          data: {
            isDeleted: true,
          },
        }),

        prisma.wishlist.updateMany({
          where: {
            productId: id,
            isDeleted: false,
          },
          data: {
            isDeleted: true,
          },
        }),
      ]);

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Error deleting product",
        error: error.message,
      });
    }
  }
);
export default router;