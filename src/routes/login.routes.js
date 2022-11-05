import { Router } from "express";
import passport from "passport";
import logger from "../logs/logger.js";
const router = Router();

router.get("/", (req, res) => {
  logger.info(
    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
      req.method
    } - Status: 200`
  );
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
