import express from "express";
import { blockNativeWebhook } from "./blocknative";
import { currentAuction } from "./current-auction";
import { getNns } from "./get-nns";
import { getNotes } from "./get-notes";
import { getOriginalEndTime } from "./get-original-endtime";
import { getReactions } from "./get-reactions";
import { postNote } from "./post-note";
import { getStats } from "./stats";
import { timestamp } from "./timestamp";
import { getChats } from "./get-chats";

export const router = express.Router();

router.get("/stats", getStats);
router.get("/current-auction", currentAuction);
router.get("/reactions/:nounId", getReactions);
router.post("/post-note", postNote);
router.get("/notes/:nounId", getNotes);
router.get("/original-endtime/:nounId", getOriginalEndTime);
router.post("/blocknative", blockNativeWebhook);
router.post("/nns", getNns);
router.get("/timestamp", timestamp);
router.get("/chats", getChats);
