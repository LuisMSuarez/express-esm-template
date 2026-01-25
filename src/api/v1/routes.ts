import { Router } from "express";
import { healthRouter } from "./modules/health/index.js";

const router = Router();

// Mount each module under its own path
router.use("/health", healthRouter);

export default router;
