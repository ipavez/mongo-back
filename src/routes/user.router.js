import { Router } from 'express';

const router = Router();


router.get('/register', (req, res) => {
    res.render('register');
})


router.get('/login', (req, res) => {
    res.render('login');
})


router.get('/current', (req, res) => {
    
})

export default router;