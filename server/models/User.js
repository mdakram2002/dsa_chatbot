import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    // unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please provide a valid email address'
    }
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  picture: {
    type: String,
    trim: true,
    validate: {
      validator: function(url) {
        if (!url) return true; // Optional field
        return /^https?:\/\/.+\..+/.test(url);
      },
      message: 'Please provide a valid URL for the picture'
    }
  },
  accessToken: {
    type: String,
    select: false
  },
  isGuest: {
    type: Boolean,
    default: false
  },
  guestId: {
    type: String,
    unique: true,
    sparse: true
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update lastActive on save
userSchema.pre('save', function(next) {
  this.lastActive = new Date();
  next();
});

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Instance method to get public profile
userSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    googleId: this.googleId,
    email: this.email,
    name: this.name,
    picture: this.picture,
    isGuest: this.isGuest,
    guestId: this.guestId,
    createdAt: this.createdAt,
    lastActive: this.lastActive
  };
};

// Index for better query performance
userSchema.index({ googleId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ isGuest: 1, guestId: 1 });
userSchema.index({ lastActive: -1 });
userSchema.index({ createdAt: -1 });

export default mongoose.model("User", userSchema);