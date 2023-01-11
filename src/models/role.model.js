// create mangoose role model

const Mongoose = require("mongoose");

const RoleSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
    required: true,
  },
});

const Role = Mongoose.model("role", RoleSchema);
module.exports = Role;