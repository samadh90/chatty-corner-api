const joi = require("joi");

/**
 * @swagger
 * components:
 *  schemas:
 *   RoleSchema:
 *    type: object
 *    required:
 *     - name
 *     - is_active
 *    properties:
 *     name:
 *      type: string
 *      description: The name of the role.
 *     is_active:
 *      type: boolean
 *      description: The status of the role.
 */
const roleSchema = joi.object().keys({
  name: joi.string().replace(/\s+/g, "").min(3).max(16).required(),
  is_active: joi.boolean().default(true).required(),
});

module.exports = roleSchema;
