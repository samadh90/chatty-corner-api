// create manngoose category model

const Mongoose = require("mongoose");

const CategorySchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true,
    required: true,
  },
  parent_category: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "category",
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

const Category = Mongoose.model("category", CategorySchema);
module.exports = Category;