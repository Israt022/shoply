import { Router } from "express";
import products from "../services/products";
import categories from "../services/categories";
import users from "../services/users";
import reviews from "../services/reviews";
import wishlists from "../services/wishlists";

const router = Router();
router.use("/api/products", products)
router.use("/api/categories", categories)
router.use("/auth", users)
router.use("/api/reviews", reviews);
router.use("/api/wishlists", wishlists);

export default router;