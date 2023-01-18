import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    updateProduct,
} from "../controller/products.js";

let router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/createProduct", createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

const productRouter = router;
export default productRouter;
