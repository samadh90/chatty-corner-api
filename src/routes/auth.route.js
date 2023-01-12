const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

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

module.exports = router;
