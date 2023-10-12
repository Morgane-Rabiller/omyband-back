
const express = require("express");
const userController =require('../controllers/userController.js');
const roleController =require("../controllers/roleController.js");
const instrumentController =require("../controllers/instrumentController.js");
const styleController =require("../controllers/styleController.js");
const typeController =require("../controllers/typeController.js");
const announcementController =require("../controllers/announcementController.js");
const authController =require("../controllers/authController.js");


const router = express.Router();


// Route de log In :
router.post('/login', authController.login);

// Protected Routes: 
router.get('/users', authController.authorize, userController.getUsers);
router.get('/users/:id', authController.authorize, userController.getUserById);
router.put('/users/:id', authController.authorize, userController.updateUser);
router.delete('/users/:id',authController.authorize, userController.deleteUser);

// router.post('/announcements/', authController.authorize, announcementController.createAnnouncement);
// router.put('/announcements/:id', authController.authorize, announcementController.updateAnnouncement);
// router.delete('/announcements/:id', authController.authorize, announcementController.deleteAnnouncement);


//Routes de Contact : 
// router.post('/contactannouncement', authController.authorize, authController.contactAnnouncement);
// router.post('/contactadmin', authController.contactAdmin);

// Routes pour les Users : 

//router.get('/users', userController.getUsers);
//router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
//router.put('/users/:id', userController.updateUser);
//router.delete('/users/:id', userController.deleteUser);

// Routes pour les Roles : 
router.get('/roles', roleController.getRoles);
router.get('/roles/:id', roleController.getRoleById);
router.post('/roles', roleController.createRole);
router.put('/roles/:id', roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);

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


