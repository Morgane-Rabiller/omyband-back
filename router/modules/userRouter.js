const express = require("express");
const userController = require('../../controllers/userController.js');
const authController =require("../../controllers/authController.js");
const router = express.Router();

//? USER ROUTES
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       500:
 *         description: Internal server error
 */
router.post('/users', userController.createUser);

// Protected Routes: 
/**
 * @swagger
 *  /users:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: List of Users
 *          content:
 *            application/json:
 *              schema: 
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Users'
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal server error
 */
router.get('/users', authController.authorize, userController.getUsers);
/**
 * @swagger
 *  /users/{id}:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the user to update
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: List of Users
 *          content:
 *            application/json:
 *              schema: 
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal server error
 */
router.get('/users/:id', authController.authorize, userController.getUserById);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/users/:id', authController.authorize, userController.updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/users/:id',authController.authorize, userController.deleteUser);

module.exports = router;