const express = require("express");
const instrumentController = require('../../controllers/instrumentController.js');
const authController =require("../../controllers/authController.js");
const router = express.Router();
const routerWrapper = require("../../middlewares/routerWrapper.js");


const validationModule = require("../../services/validation/validate.js")
const {
isntrumentSchema
} = require('../../services/validation/schema.js');
const { Instruments } = require("../../models/associations.js");

//? Routes pour les instruments : 

/**
 * @swagger
 * /instruments:
 *   get:
 *     summary: Get all instruments
 *     tags: [Instruments]
 *     responses:
 *       200:
 *         description: An array of instruments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instrument'
 *       500:
 *         description: Internal server error
 */
router.get('/instruments', routerWrapper(instrumentController.getInstruments));

/**
 * @swagger
 * /instruments/{id}:
 *   get:
 *     summary: Get an instrument by ID
 *     tags: [Instruments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the instrument to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An instrument object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrument'
 *       404:
 *         description: Instrument not found
 *       500:
 *         description: Internal server error
 */
router.get('/instruments/:id', authController.authorize, routerWrapper(instrumentController.getInstrumentById));

/**
 * @swagger
 * /instruments:
 *   post:
 *     summary: Create a new instrument
 *     tags: [Instruments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instrument'
 *     responses:
 *       201:
 *         description: Instrument successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrument'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/instruments', authController.authorize, validationModule.validateBody(isntrumentSchema),routerWrapper(instrumentController.createInstrument));

/**
 * @swagger
 * /instruments/{id}:
 *   put:
 *     summary: Update an instrument by ID
 *     tags: [Instruments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the instrument to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instrument'
 *     responses:
 *       200:
 *         description: Instrument successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrument'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Instrument not found
 *       500:
 *         description: Internal server error
 */
router.put('/instruments/:id', authController.authorize, validationModule.validateBody(isntrumentSchema), routerWrapper(instrumentController.updateInstrument));

/**
 * @swagger
 * /instruments/{id}:
 *   delete:
 *     summary: Delete an instrument by ID
 *     tags: [Instruments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the instrument to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instrument successfully deleted
 *       404:
 *         description: Instrument not found
 *       500:
 *         description: Internal server error
 */
router.delete('/instruments/:id', authController.authorize, routerWrapper(instrumentController.deleteInstrument));


module.exports = router;