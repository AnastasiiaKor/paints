const express = require("express");
const { validateFormData, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/subcategory");
const ctrl = require("../../controllers/subcategories");
const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateFormData(schemas.addSchema),
  ctrl.addSubcategory
);

router.get("/", ctrl.getAllSubcategories);

module.exports = router;
