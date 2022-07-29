import express from "express";
import { currentAuction } from "./current-auction";
import { getStats } from "./stats";

export const router = express.Router();

router.get("/stats", getStats);
router.get("/current-auction", currentAuction);
