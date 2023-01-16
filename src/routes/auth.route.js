const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       200:
 *         description: Successful login. returns token
 *       400:
 *         description: Invalid credentials
 *     tags:
 *     - Auth
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /logout:
 *  post:
 *    summary: Logout user
 *   description: Logout user
 *  responses:
 *   200:
 *    description: Successful logout
 *  400:
 *   description: Invalid request body
 * tags:
 * - Auth
 * security:
 * - bearerAuth: []
 * components:
 * securitySchemes:
 * bearerAuth:
 * type: http
 * scheme: bearer
 * bearerFormat: JWT
 * in: header
 * name: Authorization
 * description: JWT Authorization header using the Bearer scheme. Example: "Authorization
 * : Bearer {
 * token
 * }"
 * x-examples:
 * example-1:
 * value: "Bearer {
 * token
 * }"
 */
router.post("/logout", authController.logout);

router.post("/refresh", authController.refresh);

/**
 * @swagger
 * /register:
 *   post:
 *      summary: Register a new user
 *      description: Register a new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RegisterSchema'
 *      responses:
 *          201:
 *              description: Successfully registered
 *          400:
 *              description: Invalid request body
 *      tags:
 *          - Auth
 */
router.post("/register", authController.register);

/**
 * @swagger
 *  /password/forgot:
 *      post:
 *          summary: Request a password reset
 *          description: Request a password reset
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *          schema:
 *              $ref: '#/components/schemas/PasswordForgotSchema'
 *      responses:
 *          200:
 *              description: Password reset requested
 *          400:
 *              description: Invalid request body
 *      tags:
 *          - Auth
 */
router.post("/password/forgot", authController.password_forgot);

router.post("/password/reset", authController.password_reset);

router.get("/me", authController.me);

router.get("/roles", authController.roles);

router.get("/permissions", authController.permissions);

router.get("/blacklist", authController.blacklist);

router.get("/validate", authController.validate);


module.exports = router;
