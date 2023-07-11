import express from "express";
import { signInUser, signUpUser } from "../controller/users.js";
import protectBasic from '../helper/protectBasic.js';

let router = express.Router();

router.post("/signUpUser", protectBasic, signUpUser);
router.post("/signInUser", protectBasic, signInUser);
// router.get("/:id", getCategoryById);
// router.put("/updateCategory/:id", updateCategory);
// router.post("/createCategory", addCategory);
// router.delete("/deleteCategory/:id", deleteCategory);

const userRouter = router;
export default userRouter;
