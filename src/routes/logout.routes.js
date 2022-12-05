import { Router } from "express";
import { logger } from "../utils/index.js";
const router = Router();

router.get("/", (req, res) => {
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
  });
  req.session.destroy();
  res.clearCookie("cartIdCookie");
  res.clearCookie("categoriesCookie");
  res.status(302).redirect("/");
});

export default router;
