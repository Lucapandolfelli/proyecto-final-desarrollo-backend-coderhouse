import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/", UserController.getUserById);

export default router;
