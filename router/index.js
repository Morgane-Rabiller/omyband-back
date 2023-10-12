
const express = require("express");
const userController =require('../controllers/userController.js');
const instrumentController =require("../controllers/instrumentController.js");
const styleController =require("../controllers/styleController.js");
const typeController =require("../controllers/typeController.js");
const announcementController =require("../controllers/announcementController.js");
const authController =require("../controllers/authController.js");


const router = express.Router();

const roleRouter = require('./modules/rolesRouter.js');

router.use('/', roleRouter);

//? Route de log In :
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in for user
 *     tags: [Auth]
 *     requestBody:
 *       description: Login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success Message
 *                 accessToken:
 *                   type: string
 *                   description: accessToken with user data
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', authController.login);

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

// router.post('/announcements/', authController.authorize, announcementController.createAnnouncement);
// router.put('/announcements/:id', authController.authorize, announcementController.updateAnnouncement);
// router.delete('/announcements/:id', authController.authorize, announcementController.deleteAnnouncement);


//Routes de Contact : 
// router.post('/contactannouncement', authController.authorize, authController.contactAnnouncement);
// router.post('/contactadmin', authController.contactAdmin);


// Routes pour les instruments : 
router.get('/instruments', instrumentController.getInstruments);
router.get('/instruments/:id', instrumentController.getInstrumentById);
router.post('/instruments', instrumentController.createInstrument);
router.put('/instruments/:id', instrumentController.updateInstrument);
router.delete('/instruments/:id', instrumentController.deleteInstrument)

// Routes pour les styles : 
router.get('/styles', styleController.getStyles);
router.get('/styles/:id', styleController.getStyleById);
router.post('/styles', styleController.createStyle);
router.put('/styles/:id', styleController.updateStyle);
router.delete('/styles/:id', styleController.deleteStyle)

// Routes pour les types : 
router.get('/types', typeController.getTypes);
router.get('/types/:id', typeController.getTypeById);
router.post('/types', typeController.createType);
router.put('/types/:id', typeController.updateType);
router.delete('/types/:id', typeController.deleteType);

//Routeurs announcements
router.get('/announcements', announcementController.getAnnouncement);
router.get('/announcements/:id', announcementController.getAnnouncementById);
router.post('/announcements/', announcementController.createAnnouncement);
router.put('/announcements/:id', announcementController.updateAnnouncement);
router.delete('/announcements/:id', announcementController.deleteAnnouncement);


module.exports = router;


