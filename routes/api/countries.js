const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { countrySchemas } = require("../../models/country");
const ctrl = require("../../controllers/countries");
const router = express.Router();

/** дописать  authenticate*/

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateBody(countrySchemas.addSchema),
  ctrl.addCountry
);
router.get("/", ctrl.getAllCountries);

module.exports = router;
