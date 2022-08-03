import express from "express";
import { currentAuction } from "./current-auction";
import { getReactions } from "./get-reactions";
import { getStats } from "./stats";

export const router = express.Router();

router.get("/stats", getStats);
router.get("/current-auction", currentAuction);
router.get("/reactions/:nounId", getReactions);
