import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import passport from "passport";
import generateAccessToken from "../utils/token.js";

const loginRouter = Router();

loginRouter.get("/", UserController.renderLoginView);

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

export default loginRouter;
