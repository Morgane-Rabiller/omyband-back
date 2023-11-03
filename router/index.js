
const express = require("express");
const authController = require("../controllers/authController.js");
const handleError = require("../middlewares/handleError.js");



const router = express.Router();

const rolesRouter = require('./modules/roleRouter.js');
const usersRouter = require('./modules/userRouter.js');
const instrumentRouter = require('./modules/instrumentRouter.js');
const announcementRouter = require('./modules/announcementRouter.js');
const styleRouter = require('./modules/styleRouter.js');
const typeRouter = require('./modules/typeRouter.js');
const contactRouter = require('./modules/contactRouter.js')

router.use('/', rolesRouter);
router.use('/', usersRouter);
router.use('/', instrumentRouter);
router.use('/', announcementRouter);
router.use('/', styleRouter);
router.use('/', typeRouter);
router.use('/', contactRouter);

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


//Routes de Contact : 
// router.post('/contactannouncement', authController.authorize, authController.contactAnnouncement);
// router.post('/contactadmin', authController.contactAdmin);

router.use(handleError);

module.exports = router;


