import { Router } from 'express';
import { isValidPassword, verifyToken } from '../utils.js';
import jwt from 'jsonwebtoken';
import { isLoggedIn, isLoggedOut } from '../middlewares/auth.js';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', verifyToken ,async(req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const check = jwt.verify(token , 'coderSecret');
    res.send(check);
    
});

export default router;