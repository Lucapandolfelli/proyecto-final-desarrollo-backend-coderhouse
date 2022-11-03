import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/", (req, res) => {
  res.render("./pages/login.ejs");
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
