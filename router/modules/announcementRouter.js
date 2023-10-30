const express = require("express");
const announcementController = require('../../controllers/announcementController.js');
const authController =require("../../controllers/authController.js");
const router = express.Router();
const routerWrapper = require("../../middlewares/routerWrapper.js");


//Routeurs announcements

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: An array of announcements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Announcement'
 *       500:
 *         description: Internal server error
 */
router.get('/announcements', routerWrapper(announcementController.getAnnouncement));

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Get an announcement by ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the announcement to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An announcement object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.get('/announcements/:id', routerWrapper(announcementController.getAnnouncementById));

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create a new announcement
 *     tags: [Announcements]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAnnouncement'
 *     responses:
 *       201:
 *         description: Announcement successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/announcements', authController.authorize, routerWrapper(announcementController.createAnnouncement));

/**
 * @swagger
 * /announcements/{id}:
 *   put:
 *     summary: Update an announcement by ID
 *     tags: [Announcements]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the announcement to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAnnouncement'
 *     responses:
 *       200:
 *         description: Announcement successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.put('/announcements/:id', authController.authorize, routerWrapper(announcementController.updateAnnouncement));

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Delete an announcement by ID
 *     tags: [Announcements]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the announcement to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Announcement successfully deleted
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.delete('/announcements/:id', authController.authorize, routerWrapper(announcementController.deleteAnnouncement));

module.exports = router;