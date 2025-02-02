import mongoose from "mongoose";
import { createHash } from "../utils.js";
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const collection = 'Users';
const userSchema = new Schema({
    user_name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    role: { type: String, default: 'user' }, 
    password: { type: String, required: true },
    orders:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref:'Orders'
        }
    ]
});


userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next(); 
    this.password = createHash(this.password); 
    next();
});

const userModel = mongoose.model('User', userSchema);



export default userModel;