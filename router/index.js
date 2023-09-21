import { Router } from "express";
import { userController} from '../controllers/userController.js';
import { roleController } from "../controllers/roleController.js";

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


export default router;


