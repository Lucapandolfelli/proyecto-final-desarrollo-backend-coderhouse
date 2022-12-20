import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import router from "./routes/index.routes.js";
import { schema, root } from "./graphql/index.js";
import "./config/passport.js";

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
app.use(cookieParser());
app.use(router);

// View Engine
app.set("view engine", "ejs");
app.set("views", "./public/views");

export default app;
