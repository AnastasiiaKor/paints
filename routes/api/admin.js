const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/admin");
const ctrl = require("../../controllers/admins");
const router = express.Router();

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/check", authenticate, ctrl.check);
router.post("/logout", authenticate, ctrl.logout);
router.put(
  "/update",
  authenticate,
  validateBody(schemas.updateSchema),
  ctrl.update
);

module.exports = router;
