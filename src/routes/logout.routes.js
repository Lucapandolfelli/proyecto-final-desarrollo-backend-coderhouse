import { Router } from "express";
import logger from "../logs/logger.js";
const router = Router();

router.get("/", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    logger.info(
      `URL: ${req.url} - Method: ${req.method} - Status: ${req.statusCode}`
    );
    res.status(302).redirect("/");
  });
});

export default router;
