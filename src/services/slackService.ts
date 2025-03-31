// src/services/slackService.ts
import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.SLACK_BOT_TOKEN);
export const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);
