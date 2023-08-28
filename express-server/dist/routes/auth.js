import { Router } from "express";
import { postLoginController, postSignupController, } from "../controllers/auth.js";
const router = Router();
router.post("/login", postLoginController);
router.post("/signup", postSignupController);
export default router;
