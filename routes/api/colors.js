const express = require("express");
const { validateFormData, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/color");
const ctrl = require("../../controllers/colors");
const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateFormData(schemas.addSchema),
  ctrl.addColor
);

router.get("/", ctrl.getAllColors);
router.get("/:colorId", ctrl.getById);

router.put("/:colorId", authenticate, upload.single("file"), ctrl.updateColor);

router.delete("/:colorId", authenticate, ctrl.deleteColor);

module.exports = router;
