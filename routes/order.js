import express from "express";
import { cart, checkout, getCart, getOrder } from "../controller/order.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/cart", cart);
router.get("/getCart", getCart);
router.get("/getOrder", getOrder);

const orderRouter = router;

export default orderRouter;
