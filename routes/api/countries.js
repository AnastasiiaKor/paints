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

router.get("/:countryId", ctrl.getById);

router.put(
  "/:countryId",
  authenticate,
  upload.single("file"),
  ctrl.updateCountry
);

router.delete("/:countryId", authenticate, ctrl.deleteCountry);

module.exports = router;
