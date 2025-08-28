import express from "express";
import {protectRoute} from "../middleware/protectRoute.js";
import { createRide } from "../controllers/rides.controller.js";

const router = express.Router();

router.post('/create',protectRoute,createRide);


export default router;