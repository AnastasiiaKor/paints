const express = require("express");
const {
  validateFormData,
  authenticate,
  upload,
  validateBody,
} = require("../../middlewares");
const { schemas } = require("../../models/product");
const ctrl = require("../../controllers/products");
const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateFormData(schemas.addProductSchema),
  ctrl.addProduct
);

router.get("/", ctrl.getProducts);
router.get("/all", ctrl.getAll);

router.get("/:productId", ctrl.getById);

// router.put(
//   "/:productId",
//   authenticate,
//   upload.array("file"),
//   ctrl.updateProduct
// );

router.delete("/:productId", authenticate, ctrl.deleteProduct);

module.exports = router;
