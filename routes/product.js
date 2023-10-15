import express from "express";
import { getAllProducts } from "../controllers/product.js";

const router = express.Router();

router.get("/getAll", getAllProducts);

export default router;
