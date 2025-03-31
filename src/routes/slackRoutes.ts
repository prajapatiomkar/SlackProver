import express from "express";
import {
  handleInteraction,
  handleSlashCommand,
} from "../controllers/slackSlashController";

const router = express.Router();

router.post(
  "/commands",
  express.urlencoded({ extended: true }),
  handleSlashCommand
);
router.post(
  "/interactions",
  express.urlencoded({ extended: true }),
  handleInteraction
);

export default router;
