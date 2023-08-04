const express = require("express");
const { validateFormData, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/category");
const ctrl = require("../../controllers/categories");
const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateFormData(schemas.addSchema),
  ctrl.addCategory
);

router.get("/", ctrl.getAllCategories);

module.exports = router;
