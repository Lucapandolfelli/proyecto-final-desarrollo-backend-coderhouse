import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", UserController.getUserById);

export default userRouter;
