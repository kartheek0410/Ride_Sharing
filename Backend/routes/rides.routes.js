import express from "express";
import {protectRoute,captainProtectRoute} from "../middleware/protectRoute.js";
import { createRide,confirmRide,startRide,endRide } from "../controllers/rides.controller.js";

const router = express.Router();

router.post('/create',protectRoute,createRide);
router.post('/confirm',captainProtectRoute,confirmRide);
router.post('/start-ride',captainProtectRoute,startRide);
router.post('/end-ride',captainProtectRoute,endRide);

export default router;