const joi = require("joi");

/**
 * @swagger
 * components:
 *  schemas:
 *   RegisterSchema:
 *    type: object
 *    required:
 *     - username
 *     - email
 *     - password
 *    properties:
 *     username:
 *      type: string
 *      description: The username of the user.
 *     email:
 *      type: string
 *      description: The email of the user.
 *     password:
 *      type: string
 *      description: The password of the user.
 */
const registerSchema = joi.object().keys({
  username: joi.string().replace(/\s+/g, "").min(3).max(30).required(),
  email: joi.string().replace(/\s+/g, "").email().min(5).max(255).required(),
  password: joi
    .string()
    .replace(/\s+/g, "")
    .min(8)
    .max(30)
    .regex(/^(?=.*[A-Z])(?=.*[!@#\$%\^&])/)
    .required(),
});

module.exports = registerSchema;
