import express from "express";
const router = express.Router();
import { signup, login, logout, checkAuth } from "../controllers/captainAuth.controller.js";
import { captainProtectRoute } from "../middleware/protectRoute.js";

router.post("/signup",signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", captainProtectRoute ,checkAuth);

export default router;