const express = require("express");
const styleController = require('../../controllers/styleController.js');
const authController =require("../../controllers/authController.js");
const router = express.Router();
const routerWrapper = require("../../middlewares/routerWrapper.js");


const validationModule = require("../../services/validation/validate.js")
const {
    createStyleSchema,
    updateStyleSchema
} = require('../../services/validation/schema.js')

//? Routes pour les styles :

/**
 * @swagger
 * /styles:
 *   get:
 *     summary: Get all styles
 *     tags: [Styles]
 *     responses:
 *       200:
 *         description: An array of styles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Style'
 *       500:
 *         description: Internal server error
 */
router.get('/styles', routerWrapper(styleController.getStyles));

/**
 * @swagger
 * /styles/{id}:
 *   get:
 *     summary: Get a style by ID
 *     tags: [Styles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the style to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A style object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Style'
 *       404:
 *         description: Style not found
 *       500:
 *         description: Internal server error
 */
router.get('/styles/:id', authController.authorize, routerWrapper(styleController.getStyleById));

/**
 * @swagger
 * /styles:
 *   post:
 *     summary: Create a new style
 *     tags: [Styles]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Style'
 *     responses:
 *       201:
 *         description: Style successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Style'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/styles', authController.authorize,  validationModule.validateBody(createStyleSchema), routerWrapper(styleController.createStyle));

/**
 * @swagger
 * /styles/{id}:
 *   put:
 *     summary: Update a style by ID
 *     tags: [Styles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the style to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Style'
 *     responses:
 *       200:
 *         description: Style successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Style'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Style not found
 *       500:
 *         description: Internal server error
 */
router.put('/styles/:id', authController.authorize,  validationModule.validateBody(updateStyleSchema), routerWrapper(styleController.updateStyle));

/**
 * @swagger
 * /styles/{id}:
 *   delete:
 *     summary: Delete a style by ID
 *     tags: [Styles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the style to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Style successfully deleted
 *       404:
 *         description: Style not found
 *       500:
 *         description: Internal server error
 */
router.delete('/styles/:id', authController.authorize, routerWrapper(styleController.deleteStyle));

module.exports = router;
