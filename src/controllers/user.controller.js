import User from '../dao/user.dao.js';

const userService = new User();

export const getUsers = async (req, res) => {
    let result = await userService.getUsers();
    res.send({status:"success",result})
}

export const getUserById = async (req, res) => {
    const {uid} = req.params;
    let result = await userService.getUserById(uid);
    res.send({status:"success",result})
}

export const saveUser = async (req, res) => {
    const user = req.body; 
    let result = await userService.saveUser(user);
    res.send({status:"success",result})
}

export const registerUser = async(req, res) => {
    try{
    const { name, email, password } = req.body;
    const exists = await userService.getUserByEmail(email);
    if (exists.length > 0) {
        return res.status(406).send({ status: 'error', error: 'User already exists' });
    }
    const user = userModel.create({ user_name : name , email : email, password : password });
    res.status(201).send({ status: 'ok', message: 'User created', user: user });

    }catch(error){console.log(error)}
}

export const loginUser = async(req, res) => {
    try{
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
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
}