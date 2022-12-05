import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { graphqlHTTP } from "express-graphql";
import router from "./routes/index.routes.js";
import { schema, root } from "./graphql/index.js";
import "./middleware/passport.js";

// Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(compression());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.use(cookieParser("coderhouse"));
app.use(
  session({
    secret: "coderhouse",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

// View Engine
app.set("view engine", "ejs");
app.set("views", "./public/views");

export default app;
