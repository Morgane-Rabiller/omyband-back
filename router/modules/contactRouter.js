const express = require("express");
const contactController = require('../../controllers/contactMailController.js');
const authController =require("../../controllers/authController.js");
const router = express.Router();
const routerWrapper = require("../../middlewares/routerWrapper.js");


//? Routes pour les envois de mail : 

router.post('/contactAdmin', routerWrapper(contactController.contactAdmin));

router.post('/contactAnnouncement', authController.authorize, routerWrapper(contactController.contactAnnouncement));

module.exports = router;