import { Router } from "express";
import { userController} from '../controllers/userController.js';
import { roleController } from "../controllers/roleController.js";
import { instrumentController } from "../controllers/instrumentController.js";
import { styleController } from "../controllers/styleController.js";
import { typeController } from "../controllers/typeController.js";
import { announcementController}  from "../controllers/announcementController.js";


const router = Router();

// Route de log In :
router.post('/login', userController.login);

// Routes pour les Users : 
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);

// Routes pour les Roles : 
router.get('/roles', roleController.getRoles);
router.get('/roles/:id', roleController.getRoleById);
router.post('/roles', roleController.createRole);
router.put('/roles/:id', roleController.updateRole);

// Routes pour les instruments : 
router.get('/instruments', instrumentController.getInstruments);
router.get('/instruments/:id', instrumentController.getInstrumentById);
router.post('/instruments', instrumentController.createInstrument);
router.put('/instruments/:id', instrumentController.updateInstrument);

// Routes pour les styles : 
router.get('/styles', styleController.getStyles);
router.get('/styles/:id', styleController.getStyleById);
router.post('/styles', styleController.createStyle);
router.put('/styles/:id', styleController.updateStyle);

// Routes pour les types : 
router.get('/types', typeController.getTypes);
router.get('/types/:id', typeController.getTypeById);
router.post('/types', typeController.createType);
router.put('/types/:id', typeController.updateType);

//Routeurs announcements
router.get('/announcements', announcementController.getAnnouncement);
router.get('/announcements/:id', announcementController.getAnnouncementById);
router.post('/announcements/', announcementController.createAnnouncement);
router.put('/announcements/:id', announcementController.updateAnnouncement);
router.delete('/announcements/:id', announcementController.deleteAnnouncement);


export default router;


