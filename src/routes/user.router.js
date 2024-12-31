import { Router } from 'express';
import userModel from '../models/user.model.js';
import { isValidPassword, verifyToken } from '../utils.js';
import jwt from 'jsonwebtoken';
import {passportCall} from '../utils.js';
import { isLoggedIn, isLoggedOut } from '../middlewares/auth.js';

const router = Router();




router.post('/register', async(req, res) => {
    try{
    const { name, email, password } = req.body;
    const exists = await userModel.find({email : email}).exec();
    if (exists.length > 0) {
        return res.status(406).send({ status: 'error', error: 'User already exists' });
    }
    const user = userModel.create({ user_name : name , email : email, password : password });
    res.status(201).send({ status: 'ok', message: 'User created', user: user });
}catch(error){console.log(error)}
});


router.post('/login', async(req, res) => {
    try{
    const { email, password } = req.body;
    const user = await userModel.find({email : email}).exec();
    if (user.length > 0) {
        if(isValidPassword(user[0], password)){
            let token = jwt.sign( {email, role:"user"}, "coderSecret", { expiresIn : "24h"});
            res.cookie('tokenCookie', token, {httpOnly: true, maxAge:60*60*1000 }).send({user, token});
        }else{
            return res.status(401).send({ status: 'error', error: 'Invalid password' });
        }
    }
    
    }catch(error){
        console.log(error);
    }
});



router.get('/current', verifyToken ,async(req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const check = jwt.verify(token , 'coderSecret');
    res.send(check);
    
});

export default router;