import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(302).redirect("/login");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(302).redirect("/login");
    }
    req.user = decoded.data;
    next();
  });
};

export default auth;
