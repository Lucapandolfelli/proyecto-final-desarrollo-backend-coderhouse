import { Router } from "express";
import { upload } from "../config/multer.js";
import UserController from "../controllers/user.controller.js";

const registerRouter = Router();

registerRouter.get("/", UserController.renderRegisterView);

registerRouter.post("/", upload.single("image"), UserController.createUser);

export default registerRouter;
