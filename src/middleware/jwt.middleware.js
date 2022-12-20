import jwt from "jsonwebtoken";
import { logger } from "../utils/index.js";

const JWTAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      res.status(302);
      return res.redirect("/auth/login");
    }
    const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = user;
    next();
  } catch (err) {
    res.status(302);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.clearCookie("token");
    return res.redirect("/");
  }
};

export default JWTAuth;
