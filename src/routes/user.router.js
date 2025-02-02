import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { isLoggedIn, isLoggedOut } from '../middlewares/auth.js';
import { currentUser, loginUser, registerUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current' , currentUser);

export default router;