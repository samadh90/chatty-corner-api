const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");

/**
 * @swagger
 * /roles:
 *  get:
 *   summary: Get all roles
 *   description: Get all roles
 *   responses:
 *    200:
 *     description: Successfully retrieved all roles
 *    400:
 *     description: Invalid request body
 *   tags:
 *    - Role
 */
router.get("/", roleController.getAllRoles);

/**
 * @swagger
 * /roles:
 *   post:
 *      summary: Create a new role
 *      description: Create a new role
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RoleSchema'
 *          responses:
 *              201:
 *                  description: Successfully created a new role
 *              400:
 *                  description: Invalid request body
 *      tags:
 *          - Role
 */
router.post("/", roleController.createRole);

/**
 * @swagger
 * /roles/{id}:
 *  get:
 *   summary: Get a role by id
 *   description: Get a role by id
 *   name: id
 *   schema:
 *    $ref: '#/components/schemas/RoleSchema'
 *   responses:
 *    200:
 *     description: Successfully retrieved a role
 *    400:
 *     description: Invalid request body
 *   tags:
 *    - Role
 */
router.get("/:id", roleController.getRoleById);

/**
 * @swagger
 * /roles/{id}:
 *  put:
 *   summary: Update a role by id
 *   description: Update a role by id
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Id of the role to update
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/RoleSchema'
 *   responses:
 *    200:
 *     description: Successfully updated the role
 *    400:
 *     description: Invalid request body
 *    404:
 *     description: Role not found
 *   tags:
 *    - Role
 */
router.put("/:id", roleController.updateRoleById);

/**
 * @swagger
 * /roles/{id}:
 *  delete:
 *   summary: Delete a role by id
 *   description: Delete a role by id
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Id of the role to delete
 *   responses:
 *    200:
 *     description: Successfully deleted the role
 *    404:
 *     description: Role not found
 *   tags:
 *    - Role
 */
router.delete("/:id", roleController.deleteRoleById);

module.exports = router;
