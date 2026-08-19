import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// POST - Create Review
router.post("/", async (req: Request, res: Response) => {
  try {
    const { rating, comment, userId, productId } = req.body;

    if (!rating || !userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Rating, userId, and productId are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        productId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
});

// GET - All Reviews
router.get("/", async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving reviews",
      error: error.message,
    });
  }
});
// GET - Single Review
router.get("/:id", async (req: Request <{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        product: true,
      },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      data: review,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving review",
      error: error.message,
    });
  }
});

// PUT - Update Review
router.put("/:id", async (req: Request <{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (
      rating !== undefined &&
      (typeof rating !== "number" ||
        !Number.isInteger(rating) ||
        rating < 1 ||
        rating > 5)
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const review = await prisma.review.update({
      where: {
        id,
      },
      data: {
        ...(rating !== undefined && { rating }),
        ...(comment !== undefined && { comment }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
});

// DELETE - Soft Delete Review
router.delete("/:id", async (req: Request <{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const existingReview = await prisma.review.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const review = await prisma.review.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
});

export default router;