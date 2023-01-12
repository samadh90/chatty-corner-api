// import roleschema
const schemas = require("../models/schemas");
const Role = require("../models/role.model");
const utils = require("../utils/validators");

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

/**
 * Create a new role in the database
 * 
 * @param {Object} req - Express request object. It should contain the role's data in the body.
 * @param {Object} res - Express response object.
 * @returns {Object} - A JSON object containing the newly created role. If there is an error, the returned object will contain an error message.
 */
const createRole = async (req, res) => {
  const validationResult = utils.validateFormData(req.body, schemas.roleSchema);
  if (!validationResult.isValid) {
    return res.status(400).json({
      message: validationResult.message,
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
  const validationResult = utils.validateFormData(req.body, schemas.roleSchema);
  if (!validationResult.isValid) {
    return res.status(400).json({
      message: validationResult.message,
    });
  }
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
