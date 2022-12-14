import jwt from "jsonwebtoken";

const JWTAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(302).redirect("/auth/login");
    }
    const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

export default JWTAuth;
