// src/controllers/slackSlashController.ts
import { Request, Response } from "express";
import { slackClient } from "../services/slackService";

export const handleSlashCommand = async (req: Request, res: Response) => {
  try {
    const { trigger_id } = req.body;

    await slackClient.views.open({
      trigger_id,
      view: {
        type: "modal",
        callback_id: "approval_modal",
        title: { type: "plain_text", text: "Request Approval" },
        submit: { type: "plain_text", text: "Submit" },
        close: { type: "plain_text", text: "Cancel" },
        blocks: [
          {
            type: "input",
            block_id: "approver_block",
            element: { type: "users_select", action_id: "approver_select" },
            label: { type: "plain_text", text: "Select Approver" },
          },
          {
            type: "input",
            block_id: "approval_text_block",
            element: {
              type: "plain_text_input",
              multiline: true,
              action_id: "approval_text",
            },
            label: { type: "plain_text", text: "Approval Text" },
          },
        ],
      },
    });

    res.send(""); // Immediate response to Slack
  } catch (error) {
    console.log(error);
  }
};

export const handleInteraction = async (req: Request, res: Response) => {
  try {
    const payload = JSON.parse(req.body.payload);
    const { type, user } = payload;

    // Modal submission
    if (type === "view_submission") {
      res.send({}); // Respond immediately to Slack

      const state = payload.view.state.values;
      const approverId = state.approver_block.approver_select.selected_user;
      const approvalText = state.approval_text_block.approval_text.value;
      const requesterId = user.id;

      await slackClient.chat.postMessage({
        channel: approverId,
        text: `Approval request from <@${requesterId}>`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Approval Request from <@${requesterId}>:*\n${approvalText}`,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "Approve" },
                style: "primary",
                value: JSON.stringify({ requesterId }),
                action_id: "approve_request",
              },
              {
                type: "button",
                text: { type: "plain_text", text: "Reject" },
                style: "danger",
                value: JSON.stringify({ requesterId }),
                action_id: "reject_request",
              },
            ],
          },
        ],
      });
    }

    // Button Actions
    if (type === "block_actions") {
      res.send({});

      const action = payload.actions[0];
      const { requesterId } = JSON.parse(action.value);
      const decision =
        action.action_id === "approve_request" ? "approved" : "rejected";
      const approverId = payload.user.id;

      await slackClient.chat.postMessage({
        channel: requesterId,
        text: `Your approval request was *${decision}* by <@${approverId}>.`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
