import { Router } from "express";
import { logger } from "../utils/index.js";
const router = Router();

router.get("/", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.status(302).redirect("/");
  });
});

export default router;
