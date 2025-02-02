import  express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import userRouter from './routes/user.router.js';
import apiRouter from './routes/api.router.js';
import connectDB from './config/db.js';
import cors from 'cors';
import businessRouter from './routes/business.router.js';
import orderRouter from './routes/order.router.js';

const app = express();

const firmaCookie = process.env.FIRMA_COOKIE || 'firmaCookie';


const connection = connectDB(process.env.URL_MONGO);
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
app.use('/business', businessRouter);
app.use('/order', orderRouter);

app.listen(process.env.PORT, () => {
    console.log("Listening on PORT: ",process.env.PORT)
})