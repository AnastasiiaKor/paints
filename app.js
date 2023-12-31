require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRouter = require("./routes/api/admin");
const galleryRouter = require("./routes/api/pictures");
const categoryRouter = require("./routes/api/categories");
const orderRouter = require("./routes/api/orders");
const productRouter = require("./routes/api/products");

const app = express();

// app.use(cors());

app.use(express.json());

app.use("/api/admin", adminRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
