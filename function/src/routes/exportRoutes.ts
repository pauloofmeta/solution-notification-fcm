import { Router } from "express";
import exportController from "../controllers/exportController";

const router = Router();

router.post("/", exportController.createRequest);
router.get("/", exportController.getRequests);

export default router;
