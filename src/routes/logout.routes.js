import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.status(302).redirect("/");
  });
});

export default router;
