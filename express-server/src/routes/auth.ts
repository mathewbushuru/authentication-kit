import { Router } from "express";

import {
  postLoginController,
  postSignupController,
  getVerifiedUserData,
} from "../controllers/auth.js";
import verifyToken from "../middleware/auth-jwt.js";

const router = Router();

router.post("/login", postLoginController);
router.post("/signup", postSignupController);
router.get("/verify-token", verifyToken, getVerifiedUserData);
router.post("/forgot-password", () => {});
router.post("/verify-email", () => {});

export default router;
