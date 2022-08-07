import express from "express";
import { blockNativeWebhook } from "./blocknative";
import { currentAuction } from "./current-auction";
import { getNotes } from "./get-notes";
import { getOriginalEndTime } from "./get-original-endtime";
import { getReactions } from "./get-reactions";
import { postNote } from "./post-note";
import { getStats } from "./stats";

export const router = express.Router();

router.get("/stats", getStats);
router.get("/current-auction", currentAuction);
router.get("/reactions/:nounId", getReactions);
router.post("/post-note", postNote);
router.get("/notes/:nounId", getNotes);
router.get("/original-endtime/:nounId", getOriginalEndTime);
router.post("/blocknative", blockNativeWebhook);
