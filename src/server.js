const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/carrito", require("./routes/carrito"));
app.use((req, res, next) => {
  res.status(404).send({ error: "Not found" });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
