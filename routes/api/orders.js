const express = require("express");
const { authenticate, validateBody } = require("../../middlewares");
const { Schemas } = require("../../models/order");
const ctrl = require("../../controllers/orders");
const router = express.Router();

router.post("/", validateBody(Schemas.addOrderSchema), ctrl.addOrder);
router.get("/", authenticate, ctrl.getAllOrders);

router.patch(
  "/:orderId",
  authenticate,
  validateBody(Schemas.statusSchema),
  ctrl.changeStatus
);

router.delete("/:orderId", authenticate, ctrl.deleteOrder);

module.exports = router;
