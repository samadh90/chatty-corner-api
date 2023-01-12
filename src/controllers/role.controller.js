// import roleschema
const schemas = require("../models/schemas");
const Role = require("../models/role.model");

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};

// create and save a new role
const createRole = async (req, res) => {
  const formData = req.body;
  const { error } = schemas.roleSchema.validate(formData);
  if (error) {
    console.error(error);
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const role = await Role.create(req.body);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};

const updateRoleById = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};

const deleteRoleById = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};

module.exports = {
  getAllRoles,
  createRole,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
