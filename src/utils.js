import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY_JWT || 'CoderKeyComoUnSecret';
const EXPIRES_TIME_TOKEN = process.env.EXPIRES_TIME_TOKEN || '24h';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);


export const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: EXPIRES_TIME_TOKEN });
    return token;
};


export const verifyToken = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ 
        error: "Not authenticated"
    });
    const token = authHeader.split(' ')[1]; 
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "Not authorized" });
        req.user = credentials.user;
        next();
    });
};