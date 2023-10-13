const express = require("express");
const typeController = require('../../controllers/typeController.js');
const authController =require("../../controllers/authController.js");
const router = express.Router();



//? Routes pour les types : 

/**
 * @swagger
 * /types:
 *   get:
 *     summary: Get all types
 *     tags: [Types]
 *     responses:
 *       200:
 *         description: An array of types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 *       500:
 *         description: Internal server error
 */
router.get('/types', typeController.getTypes);

/**
 * @swagger
 * /types/{id}:
 *   get:
 *     summary: Get a type by ID
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the type to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A type object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       404:
 *         description: Type not found
 *       500:
 *         description: Internal server error
 */
router.get('/types/:id', typeController.getTypeById);

/**
 * @swagger
 * /types:
 *   post:
 *     summary: Create a new type
 *     tags: [Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Type'
 *     responses:
 *       201:
 *         description: Type successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/types', typeController.createType);

/**
 * @swagger
 * /types/{id}:
 *   put:
 *     summary: Update a type by ID
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the type to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Type'
 *     responses:
 *       200:
 *         description: Type successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Type not found
 *       500:
 *         description: Internal server error
 */
router.put('/types/:id', typeController.updateType);

/**
 * @swagger
 * /types/{id}:
 *   delete:
 *     summary: Delete a type by ID
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the type to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Type successfully deleted
 *       404:
 *         description: Type not found
 *       500:
 *         description: Internal server error
 */
router.delete('/types/:id', typeController.deleteType);

module.exports = router;