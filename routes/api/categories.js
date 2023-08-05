const express = require("express");
const {
  validateFormData,
  authenticate,
  upload,
  validateBody,
} = require("../../middlewares");
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
router.get("/:categoryId", ctrl.getById);

router.put(
  "/:categoryId",
  authenticate,
  upload.single("file"),
  ctrl.updateCategory
);

router.delete("/:categoryId", authenticate, ctrl.deleteCategory);

router.post(
  "/:categoryId/subcategories",
  authenticate,
  validateBody(schemas.addSubSchema),
  ctrl.addSubcategory
);

module.exports = router;
