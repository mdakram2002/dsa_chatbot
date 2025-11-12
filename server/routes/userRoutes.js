import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get user profile
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required"
      });
    }

    const user = await User.findById(userId).select('-accessToken -__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        isGuest: user.isGuest,
        guestId: user.guestId,
        createdAt: user.createdAt,
        lastActive: user.lastActive
      }
    });
  } catch (error) {
    console.error("Get user profile error:", error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID format"
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch user profile"
    });
  }
});

// Update user profile
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, picture } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required"
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (picture) updateData.picture = picture;

    // Only update if there's data to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid fields to update"
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-accessToken -__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        isGuest: user.isGuest,
        guestId: user.guestId,
        createdAt: user.createdAt,
        lastActive: user.lastActive
      }
    });
  } catch (error) {
    console.error("Update user profile error:", error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID format"
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to update user profile"
    });
  }
});

// Delete user account
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required"
      });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    // Note: In a real application, you might want to also delete user's chats
    // await Chat.deleteMany({ userId });

    res.json({
      success: true,
      message: "User account deleted successfully"
    });
  } catch (error) {
    console.error("Delete user error:", error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID format"
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to delete user account"
    });
  }
});

// Get user statistics
router.get("/:userId/stats", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    // Get chat statistics for the user
    const Chat = (await import('../models/Chat.js')).default;

    const chatStats = await Chat.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: null,
          totalChats: { $sum: 1 },
          totalMessages: { $sum: { $size: "$messages" } },
          userMessages: {
            $sum: {
              $size: {
                $filter: {
                  input: "$messages",
                  as: "msg",
                  cond: { $eq: ["$$msg.sender", "user"] }
                }
              }
            }
          },
          botMessages: {
            $sum: {
              $size: {
                $filter: {
                  input: "$messages",
                  as: "msg",
                  cond: { $eq: ["$$msg.sender", "bot"] }
                }
              }
            }
          },
          lastActivity: { $max: "$updatedAt" }
        }
      }
    ]);

    const stats = chatStats[0] || {
      totalChats: 0,
      totalMessages: 0,
      userMessages: 0,
      botMessages: 0,
      lastActivity: null
    };

    res.json({
      success: true,
      stats: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isGuest: user.isGuest,
          joined: user.createdAt,
          lastActive: user.lastActive
        },
        chats: {
          total: stats.totalChats,
          totalMessages: stats.totalMessages,
          userMessages: stats.userMessages,
          botMessages: stats.botMessages,
          lastActivity: stats.lastActivity
        }
      }
    });
  } catch (error) {
    console.error("Get user stats error:", error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID format"
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch user statistics"
    });
  }
});

// Clean up guest users (admin/utility endpoint)
router.delete("/cleanup/guests", async (req, res) => {
  try {
    // Delete guest users older than 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await User.deleteMany({
      isGuest: true,
      lastActive: { $lt: sevenDaysAgo }
    });

    res.json({
      success: true,
      message: `Cleaned up ${result.deletedCount} guest accounts older than 7 days`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Cleanup guest users error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to clean up guest users"
    });
  }
});

export default router;