import express from "express";
import checkAdmin from "./middleware/checkAdmin.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(checkAdmin);
app.use("/api", router);
app.use((req, res, next) => {
  res.status(404).send({ error: "Not found" });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
