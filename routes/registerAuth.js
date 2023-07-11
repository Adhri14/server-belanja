import express from "express";
import { registerAuth } from "../controller/register.js";

let router = express.Router();

router.post('/', registerAuth);

const registerAuthRouter = router;
export default registerAuthRouter;