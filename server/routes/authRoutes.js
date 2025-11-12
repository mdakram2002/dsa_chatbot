import express from "express";
import {
  googleAuth,
  createGuestUser,
  convertGuestToUser
} from "../controllers/authController.js";

const router = express.Router();

router.post("/google", googleAuth);
router.post("/guest", createGuestUser);
router.post("/convert-guest", convertGuestToUser);

export default router;