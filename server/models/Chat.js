import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    messages: [messageSchema],
    isGuestChat: {
      type: Boolean,
      default: false,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Update lastMessageAt when messages change
chatSchema.pre("save", function (next) {
  if (this.messages.length > 0) {
    this.lastMessageAt = this.messages[this.messages.length - 1].timestamp;
  }
  next();
});

// Indexes for better performance
chatSchema.index({ userId: 1, lastMessageAt: -1 });
chatSchema.index({ isGuestChat: 1 });
chatSchema.index({ "messages.timestamp": -1 });

export default mongoose.model("Chat", chatSchema);
