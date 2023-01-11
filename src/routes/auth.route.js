const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @openapi
 * /register:
 *   post:
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Invalid request body
 *     tags:
 *      - Auth
 */
router.post("/register", authController.register);

/**
 * @openapi
 * /login:
 *   post:
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
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
