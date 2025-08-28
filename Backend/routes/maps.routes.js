import express from  "express";
import { getCoordinates,getFare } from "../controllers/map.controller.js";

const router = express.Router();


router.post("/getCoordinates",getCoordinates);
router.post("/getFare",getFare);


export default router;


