import  express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import dotenv from 'dotenv'; 
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import userRouter from './routes/user.router.js';
import apiRouter from './routes/api.router.js';
import connectDB from './config/db.js';
import cors from 'cors';

const app = express();
dotenv.config(); 

const firmaCookie = process.env.FIRMA_COOKIE || 'firmaCookie';
const urlMongo = process.env.URL_MONGO || 'urlMONGO';
const PORT = process.env.PORT || '8080';

const connection = connectDB(urlMongo);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser(firmaCookie)); 
initializePassport();
app.use(passport.initialize());

app.use(express.static( __dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');


app.use('/user', userRouter);
app.use('/', apiRouter);

