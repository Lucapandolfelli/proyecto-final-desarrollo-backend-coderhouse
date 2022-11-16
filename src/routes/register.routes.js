import { Router } from "express";
import { upload } from "../utils/index.js";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/", UserController.renderRegisterView);

router.post("/", upload.single("image"), UserController.createUser);

export default router;
