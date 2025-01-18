import { Router } from "express";
import { custumerConstroller } from "../controllers";

const router = Router();

router.post("/", custumerConstroller.create);
router.patch("/:id", custumerConstroller.update);
router.delete("/:id", custumerConstroller.deleteById);
router.get("/", custumerConstroller.getAll);
router.get("/:id", custumerConstroller.getById);

export default router;
