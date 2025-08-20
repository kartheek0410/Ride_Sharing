import express from "express";
import {signup,login,logout,checkAuth} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/protectRoute.js";

const router =express.Router();

router.post("/signup",signup);
router.post("/login" ,login);
router.post("/logout",logout);
router.post("/check",protectRoute,checkAuth);

export default router;