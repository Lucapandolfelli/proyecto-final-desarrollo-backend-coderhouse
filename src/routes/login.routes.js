import { Router } from "express";
import passport from "passport";
import { logger } from "../utils/index.js";
const router = Router();

router.get("/", (req, res) => {
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res.status(200).render("./pages/login.ejs");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

export default router;
