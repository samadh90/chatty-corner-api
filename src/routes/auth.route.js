const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/refresh", authController.refresh);

router.post("/register", authController.register);

router.post("/password/forgot", authController.password_forgot);

/**
 * @swagger
 *  /password/reset:
 *      post:
 *          summary: Reset a password
 *          description: Reset a password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PasswordResetSchema'
 *      responses:
 *          200:
 *              description: Password reset requested
 *          400:
 *              description: Invalid request body
 *      tags:
 *          - Auth
 */
router.post("/password/reset", authController.password_reset);

/**
 * @swagger
 *  /me:
 *      get:
 *          summary: Get current user
 *          description: Get current user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PasswordForgotSchema'
 *      responses:
 *          200:
 *              description: Password reset requested
 *          400:
 *              description: Invalid request body
 *      tags:
 *              - Auth
 */
router.get("/me", authController.me);

router.get("/roles", authController.roles);

router.get("/permissions", authController.permissions);

router.get("/blacklist", authController.blacklist);

router.get("/validate", authController.validate);

module.exports = router;
