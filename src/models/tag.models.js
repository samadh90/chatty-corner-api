// create mondoose tag model and export it

const Mongoose = require("mongoose");

const TagSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true,
    required: true,
  },
  is_restricted: {
    type: Boolean,
    default: false,
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
});

const Tag = Mongoose.model("tag", TagSchema);
module.exports = Tag;
