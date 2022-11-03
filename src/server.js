import express from "express";
import router from "./routes/index.routes.js";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import "./middleware/passport.js";
import compression from "compression";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(compression());
app.use(cookieParser("coderhouse"));
app.use(
  session({
    secret: "coderhouse",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

// View Engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Server
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}...`);
    });
  })
  .catch((error) => console.log(error.message));
