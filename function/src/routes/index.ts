import { Router } from "express";
import exportRoutes from "./exportRoutes";
import custumerRoutes from "./custumerRoutes";
import authMiddleware from "../middlewares/authMiddleware";
import authController from "../controllers/authController";

const router = Router();

router.post("/authenticate/register", authController.register);
router.post("/authenticate/login", authController.login);

router.use(authMiddleware);
router.use("/exports", exportRoutes);
router.use("/custumers", custumerRoutes);

export default router;
