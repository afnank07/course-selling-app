// const mongoose = require('mongoose');
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type: String},
    password : String,
    purchasedCourse : [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
  });
  
const adminSchema = new mongoose.Schema({
    username : String,
    password : String
    });

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    id: Number
    });

// mongoose models 
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

export { User, Admin, Course };