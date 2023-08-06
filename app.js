require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRouter = require("./routes/api/admin");
const countryRouter = require("./routes/api/countries");
const galleryRouter = require("./routes/api/pictures");
const categoryRouter = require("./routes/api/categories");
const subcategoryRouter = require("./routes/api/subcategories");
const colorRouter = require("./routes/api/colors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/countries", countryRouter);
app.use("/gallery", galleryRouter);
app.use("/categories", categoryRouter);
app.use("/subcategories", subcategoryRouter);
app.use("/colors", colorRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
