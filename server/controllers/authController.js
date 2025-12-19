import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

export const googleAuth = async (req, res) => {
  try {
    const { access_token, userInfo } = req.body;

    if (!userInfo || !userInfo.sub) {
      return res.status(400).json({
        success: false,
        error: "Invalid user information"
      });
    }

    let user = await User.findOne({ googleId: userInfo.sub });

    if (!user) {
      user = new User({
        googleId: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        accessToken: access_token,
        isGuest: false
      });
      await user.save();
    } else {
      // Update existing user
      user.accessToken = access_token;
      user.picture = userInfo.picture || user.picture;
      user.name = userInfo.name || user.name;
      await user.save();
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        isGuest: false
      }
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      success: false,
      error: "Authentication failed"
    });
  }
};

export const createGuestUser = async (req, res) => {
  try {
    const guestId = `guest_${uuidv4()}`;
    const guestUser = new User({
      email: `${guestId}@guest.dsachatbot.com`,
      name: "Guest User",
      isGuest: true,
      guestId: guestId
    });

    await guestUser.save();

    res.json({
      success: true,
      user: {
        id: guestUser._id,
        guestId: guestUser.guestId,
        name: guestUser.name,
        isGuest: true
      }
    });
  } catch (error) {
    console.error("Guest user creation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create guest session"
    });
  }
};

export const convertGuestToUser = async (req, res) => {
  try {
    const { guestId, userInfo, access_token } = req.body;

    if (!guestId || !userInfo) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    const guestUser = await User.findOne({ guestId, isGuest: true });
    if (!guestUser) {
      return res.status(404).json({
        success: false,
        error: "Guest session not found"
      });
    }

    // Update guest user to regular user
    guestUser.googleId = userInfo.sub;
    guestUser.email = userInfo.email;
    guestUser.name = userInfo.name;
    guestUser.picture = userInfo.picture;
    guestUser.accessToken = access_token;
    guestUser.isGuest = false;
    guestUser.guestId = undefined;

    await guestUser.save();

    res.json({
      success: true,
      user: {
        id: guestUser._id,
        googleId: guestUser.googleId,
        email: guestUser.email,
        name: guestUser.name,
        picture: guestUser.picture,
        isGuest: false
      }
    });
  } catch (error) {
    console.error("Guest conversion error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to convert guest to user"
    });
  }
};