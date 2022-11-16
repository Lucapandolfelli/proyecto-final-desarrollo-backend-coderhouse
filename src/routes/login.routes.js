import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();

router.get("/", UserController.renderLoginView);

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

export default router;
