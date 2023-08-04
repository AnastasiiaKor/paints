const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/pictures");
const router = express.Router();

router.get("/", ctrl.getAllPictures);
router.post("/", authenticate, upload.single("picture"), ctrl.addPicture);
router.delete("/:pictureId", authenticate, ctrl.deletePicture);

module.exports = router;
