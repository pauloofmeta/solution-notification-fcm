import { Router } from "express";
import exportRoutes from "./exportRoutes";

const router = Router();

router.use("/exports", exportRoutes);

export default router;
