import  express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import dotenv from 'dotenv'; 


import userRouter from './routes/user.router.js';
import apiRouter from './routes/api.router.js';

const app = express();


dotenv.config(); 
const firmaCookie = process.env.FIRMA_COOKIE || 'firmaCookie';
const uriMongo = process.env.URI_MONGO || 'urlMONGO';
const PORT = process.env.PORT || '8080';



app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser(firmaCookie)); 
app.use(express.static( __dirname + '/public'));



app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');


app.use('/user', userRouter);
app.use('/', apiRouter);


mongoose.connect(uriMongo)
    .then( 
        () =>
           
            app.listen(PORT, ()=> {
                console.log("mongo Listening on PORT: "+PORT);
            }))
    .catch((error) => console.error('Error en conexion:', error))