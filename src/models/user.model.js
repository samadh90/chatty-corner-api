const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: {
    type: Date,
    unique: false,
    required: true
  },
  updated_at: {
    type: Date
  },
  deleted_at: {
    type: Date
  }
});

const User = Mongoose.model("user", UserSchema);
module.exports = User;
