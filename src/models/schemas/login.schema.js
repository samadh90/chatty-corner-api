const joi = require("joi");

/**
 * @swagger
 * components:
 *  schemas:
 *   LoginSchema:
 *    type: object
 *    required:
 *     - email
 *     - password
 *    properties:
 *     email:
 *      type: string
 *      description: The email of the user.
 *     password:
 *      type: string
 *      description: The password of the user.
 */
const loginSchema = joi.object().keys({
  email: joi.string().replace(/\s+/g, "").email().min(5).max(255).required(),
  password: joi.string().replace(/\s+/g, "").max(30).required(),
});

module.exports = loginSchema;
