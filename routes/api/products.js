const express = require("express");
const { authenticate, upload, validateFields } = require("../../middlewares");
const { schemas } = require("../../models/product");
const ctrl = require("../../controllers/products");
const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  validateFields(schemas.addProductSchema),
  ctrl.addProduct
);

router.get("/", ctrl.getProducts);
router.get("/all", ctrl.getAll);

router.get("/:productId", ctrl.getById);

router.put(
  "/:productId",
  authenticate,
  upload.single("file"),
  ctrl.updateProduct
);

router.delete("/:productId", authenticate, ctrl.deleteProduct);

module.exports = router;
