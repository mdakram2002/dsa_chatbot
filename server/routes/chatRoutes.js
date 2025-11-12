import express from "express";
import {
  getChats,
  createChat,
  sendMessage,
  deleteChat,
  deleteAllChats
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/user/:userId", getChats);
router.post("/user/:userId", createChat);
router.post("/:chatId/message", sendMessage);
router.delete("/:chatId", deleteChat);
router.delete("/user/:userId/all", deleteAllChats);

export default router;