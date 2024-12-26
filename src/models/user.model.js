import mongoose from "mongoose";
import { createHash } from "../utils.js";

const { Schema } = mongoose;

const userSchema = new Schema({
    user_name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    role: { type: String, default: 'user' }, 
    password: { type: String, required: true } 
});


userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next(); 
    this.password = createHash(this.password); 
    next();
})

const userModel = mongoose.model('User', userSchema);

export default userModel;