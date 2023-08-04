const express = require("express");
const {
  validateFormData,
  authenticate,
  upload,
  validateBody,
} = require("../../middlewares");
const { Schemas } = require("../../models/country");
const ctrl = require("../../controllers/countries");
const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateFormData(Schemas.addSchema),
  ctrl.addCountry
);
router.get("/", ctrl.getAllCountries);

router.patch(
  "/:countryId",
  authenticate,
  validateBody(Schemas.addCategorySchema),
  ctrl.addCategory
);

module.exports = router;
