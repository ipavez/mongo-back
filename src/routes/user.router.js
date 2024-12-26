import { Router } from 'express';
import userModel from '../models/user.model.js';
const router = Router();


router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;
    const exists = await userModel.find({email : email}).exec();
    console.log(exists)
    if (exists.length > 0) {
        return res.status(406).send({ status: 'error', error: 'User already exists' });
    }
    const user = userModel.create({ user_name : name , email : email, password : password });
    res.status(201).send({ status: 'ok', user });
})


router.get('/login', (req, res) => {
    res.render('login');
})


router.get('/current', (req, res) => {
    
})

export default router;