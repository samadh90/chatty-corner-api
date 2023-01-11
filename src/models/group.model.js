// create mangoose group model and export it

const Mongoose = require("mongoose");

const GroupSchema = new Mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  invitation_link: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: false,
    required: true,
  },
  category: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  tags: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  members: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  is_private: {
    type: Boolean,
    default: false,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
    required: true,
  },

  created_at: {
    type: Date,
    unique: false,
    required: true,
  },
  created_by: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  updated_at: {
    type: Date,
  },
  deleted_at: {
    type: Date,
  },
});

const Group = Mongoose.model("group", GroupSchema);
module.exports = Group;
