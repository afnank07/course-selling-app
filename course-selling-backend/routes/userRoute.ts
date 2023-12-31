// const express = require('express');
// const {tokenAuthentication, jwtSecretKey} = require("../middleware/auth");
// const { User, Admin, Course } = require('../db/index');
// const jwt = require('jsonwebtoken');

import express from "express";
import {tokenAuthentication, jwtSecretKey} from "../middleware/auth";
import { User, Admin, Course } from '../db/index';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

const router = express.Router();

interface courseType {
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
  id: Number
};

// User routes
router.post('/signup', async(req, res) => {
    // logic to sign up user
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (user){
      res.status(403).json({ message: 'User already exists' });
    } else{
      const newUser = {username, password};
      const userObj = new User(newUser);
      await userObj.save();
      const token = jwt.sign({newUser, role:"user"}, jwtSecretKey, {expiresIn:'1h'});
      res.json({"message":"User has been created", token});
    }
  });
  
  router.post('/login', async(req, res) => {
    // logic to log in user
    let userDetails = {
      username : req.headers.username,
      password : req.headers.password,
      role: "user"
    }
    const userObj = await User.findOne({username : req.headers.username});
  
    if (userObj){
      const token = jwt.sign({userDetails}, jwtSecretKey, {expiresIn:'1h'});
      res.json({message: 'User loggedin successfully', token});
    } else{
      res.status(403).json({ message: 'User does not exists! Please SignUp.' });
    }
  });
  
  router.get('/me', tokenAuthentication, async(req, res)=>{
    console.log("req.headers.userName: ", req.headers.userName)
    console.log("typeof req.headers.userName: ", typeof req.headers.userName)
    let userName = null;
    if(typeof req.headers.userName === 'string'){
      if('newUser' in JSON.parse(req.headers.userName)){
        userName = JSON.parse(req.headers.userName)["newUser"]["username"]
      }else{
        userName = JSON.parse(req.headers.userName)["userDetails"]["username"]
      }
    }
    else{
      userName = req.headers.userName
    }
    // console.log("userName: ", userName)
    res.json({
      // username: req.user.username
      username: userName
    })
  });

  router.get('/courses', tokenAuthentication, async(req, res) => {
    // logic to list all courses
    const courseDetails = await Course.find({published: true});
    res.json(courseDetails);
  });
  
  router.post('/courses/:courseId', tokenAuthentication, async(req, res) => {
    // logic to purchase a course
    // console.log("req.user: ", req.user);
    // console.log("req.user.username: ", req.user.userDetails.username);
  
    const idNo = req.params.courseId;
    const courseDetails = await Course.findById(idNo);
    console.log("courseDetails: ", courseDetails);
    if (courseDetails){
      let userName = null;
      if(typeof req.headers.userName === 'string'){
        if('newUser' in JSON.parse(req.headers.userName)){
          userName = JSON.parse(req.headers.userName)["newUser"]["username"]
        }else{
          userName = JSON.parse(req.headers.userName)["userDetails"]["username"]
        }
      } else{
        userName = req.headers.userName
      }
      const userDetails = await User.findOne({"username":userName});
      // console.log("userDetails: ", userDetails);
      // console.log("req.headers.userName: ", req.headers.userName);
      // console.log("userName: ", userName);
      if (userDetails){
        // console.log("courseDetails: ", courseDetails)
        userDetails.purchasedCourse.push(courseDetails._id as mongoose.Types.ObjectId);
        await userDetails.save();
        res.json({ message: 'Course purchased successfully' })
      }else{
        res.status(403).json({ message: 'User not found' })
      }
    } else {
        res.status(404).json({ message: 'Course not found' })
      }
  
  });
  
  router.get('/purchasedCourses', tokenAuthentication, async(req, res) => {
    let userName = null;
    if(typeof req.headers.userName === 'string'){
      if('newUser' in JSON.parse(req.headers.userName)){
        userName = JSON.parse(req.headers.userName)["newUser"]["username"]
      }else{
        userName = JSON.parse(req.headers.userName)["userDetails"]["username"]
      }
    } else{
      userName = req.headers.userName
    }
    // logic to view purchased courses
    const userDetails = await User.findOne({"username":userName}).populate('purchasedCourse');
    if (userDetails){
      res.json(userDetails.purchasedCourse);
    }else{
      res.status(404).json({message: "User not found"});
    }
  });

  router.use((req, res)=>{
    res.status(404).send("Route Not found!");
  })

  // module.exports = router;
  export default router;