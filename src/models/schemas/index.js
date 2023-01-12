const schemas = {};

schemas.loginSchema = require("./login.schema");;
schemas.registerSchema = require("./register.schema");
schemas.roleSchema = require("./role.schema");

module.exports = schemas;
