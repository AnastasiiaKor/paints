const express = require("express");
const {
  validateFormData,
  authenticate,
  upload,
  validateBody,
} = require("../../middlewares");
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
router.get("/:subcategoryId", ctrl.getById);

router.put(
  "/:subcategoryId",
  authenticate,
  upload.single("file"),
  ctrl.updateSubcategory
);

router.delete("/:subcategoryId", authenticate, ctrl.deleteSubcategory);

module.exports = router;
