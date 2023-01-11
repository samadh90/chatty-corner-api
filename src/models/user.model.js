const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  pwd_hash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "online",
    required: true,
  },
  last_seen: {
    type: Date,
  },
  last_active: {
    type: Date,
  },
  is_banned: {
    type: Boolean,
    default: false,
  },
  ban_reason: {
    type: String,
  },
  created_at: {
    type: Date,
    unique: false,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  deleted_at: {
    type: Date,
  },
  roles: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "role",
    },
  ],
  notifications: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "notification",
    },
  ],
  groups: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "group",
    },
  ],
  contacts: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  followers: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  following: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const User = Mongoose.model("user", UserSchema);
module.exports = User;
