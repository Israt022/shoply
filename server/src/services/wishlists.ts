import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// POST - Add product to wishlist
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "userId and productId are required",
      });
    }

    // Check if already exists
    const existingWishlist = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingWishlist && !existingWishlist.isDeleted) {
      return res.status(409).json({
        success: false,
        message: "Product already exists in wishlist",
      });
    }

    // If previously deleted, restore it
    if (existingWishlist && existingWishlist.isDeleted) {
      const wishlist = await prisma.wishlist.update({
        where: {
          id: existingWishlist.id,
        },
        data: {
          isDeleted: false,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Product added to wishlist again",
        data: wishlist,
      });
    }

    const wishlist = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      data: wishlist,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error adding product to wishlist",
      error: error.message,
    });
  }
});


// DELETE - Remove product from wishlist
router.delete("/:id", async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const wishlist = await prisma.wishlist.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    const deletedWishlist = await prisma.wishlist.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      data: deletedWishlist,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error removing product from wishlist",
      error: error.message,
    });
  }
});

// GET - Wishlist by User ID
router.get("/user/:userId", async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const wishlists = await prisma.wishlist.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Wishlist retrieved successfully",
      data: wishlists,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving wishlist",
      error: error.message,
    });
  }
});

export default router;