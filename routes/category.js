import express from "express";
import {
    addCategory,
    deleteCategory,
    getCategory,
    getCategoryById,
    updateCategory,
} from "../controller/category.js";

let router = express.Router();

router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.put("/updateCategory/:id", updateCategory);
router.post("/createCategory", addCategory);
router.delete("/deleteCategory/:id", deleteCategory);

const categoryRouter = router;
export default categoryRouter;
