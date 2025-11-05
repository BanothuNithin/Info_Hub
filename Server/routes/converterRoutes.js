import express from "express";
import { convertCurrency } from "../controllers/converterController.js";
const router = express.Router();
router.get("/", convertCurrency);
export default router;
