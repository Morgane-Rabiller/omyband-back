import { Router } from "express";
import {userController} from '../controllers/userController.js';

const router = Router();
router.get('/', () => console.log('coucou'));
// Routes pour les Users : 
router.get('/users', userController.getUsers);

export default router;


