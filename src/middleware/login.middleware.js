import passport from "passport";
import jwt from "jsonwebtoken";
import { logger } from "../utils/index.js";

const loginMiddleware = async (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      try {
        if (err || !user) {
          res.status(404);
          logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          res.render("./pages/error.ejs", {
            code: 404,
            message: "User Not Found",
          });
        } else {
          req.login(user, { session: false }, async (err) => {
            if (err) return next(err);
            const body = {
              _id: user._id,
              email: user.email,
              image: user.image,
            };
            const token = jwt.sign(body, process.env.JWT_SECRET_TOKEN, {
              expiresIn: "1800s", // 30 minutes
            });
            res
              .cookie("token", token, {
                httpOnly: true,
              })
              .redirect("/");
          });
        }
      } catch (e) {
        res.status(500);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 500,
          message: "Internal Server Error",
        });
      }
    }
  )(req, res, next);
};

export default loginMiddleware;
