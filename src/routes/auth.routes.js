import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import UserController from "../controllers/user.controller.js";
import { upload } from "../config/multer.js";
import { logger } from "../utils/index.js";

const authRouter = Router();

authRouter.get("/login", UserController.renderLoginView);

authRouter.post("/login", async (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      try {
        if (err || !user) {
          return next(new Error(err));
        }

        req.login(user, { session: false }, async (err) => {
          if (err) return next(err);
          const body = { _id: user._id, email: user.email, image: user.image };
          const token = jwt.sign(body, process.env.JWT_SECRET_TOKEN, {
            expiresIn: "1800s", // 30 minutes
          });
          res
            .cookie("token", token, {
              httpOnly: true,
            })
            .redirect("/");
        });
      } catch (e) {
        return next(e);
      }
    }
  )(req, res, next);
});

authRouter.get("/logout", (req, res) => {
  try {
    res.status(302);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.clearCookie("token");
    res.clearCookie("cartIdCookie");
    res.clearCookie("categoriesCookie");
    res.clearCookie("userIdCookie");
    res.redirect("/");
  } catch (err) {
    res.status(500);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
});

authRouter.get("/register", UserController.renderRegisterView);

authRouter.post("/register", upload.single("image"), UserController.createUser);

export default authRouter;
