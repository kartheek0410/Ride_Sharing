import express from  "express";
import { getCoordinates,getFare , getSuggestions } from "../controllers/map.controller.js";

const router = express.Router();


router.post("/getCoordinates",getCoordinates);
router.post("/getFare",getFare);
router.post("/getSuggestions",getSuggestions);


export default router;


