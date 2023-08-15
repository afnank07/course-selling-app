// const express = require('express');
// const {tokenAuthentication, jwtSecretKey} = require("../middleware/auth");
// const { User, Admin, Course } = require('../db/index');
// const jwt = require('jsonwebtoken');

import express from "express";
import {tokenAuthentication, jwtSecretKey} from "../middleware/auth";
import { User, Admin, Course } from '../db/index';
import jwt from 'jsonwebtoken';
import { stringify } from "querystring";
// import { Request, Response, NextFunction } from 'express';

const router = express.Router();

// Admin routes
router.post('/signup', async(req, res) => {
    // logic to sign up admin
    let adminDetails = {
      username : req.body.username,
      password : req.body.password,
      role: "admin"
    }
  
    const admin = await Admin.findOne({username : req.body.username});
    if (admin){
      res.status(403).json({ message: 'Admin already exists' });
    } else{
      const newAdmin = new Admin(adminDetails)
      newAdmin.save();
      const token = jwt.sign(adminDetails, jwtSecretKey, { expiresIn: '1h' });
      res.json({ 
        message: 'Admin created successfully', 
        token: token
      });
    }
  });
  
  router.post('/login', async (req, res) => {
    // logic to log in admin
    let adminDetails = {
      username : req.headers.username,
      password : req.headers.password,
      role: "admin"
    }
  
    const admin = await Admin.findOne({username : req.headers.username});
    if (admin){
      const token = jwt.sign(adminDetails, jwtSecretKey, { expiresIn: '1h' });
      // console.log("Well Hello")
      res.json({ 
        message: 'Admin loggedin successfully', 
        token: token
      });
    } else{
      res.status(403).json({ message: 'Admin does not exists! Please SignUp.' });
    }
  });
  
  router.get('/me', tokenAuthentication, async(req, res)=>{
    // console.log("req.headers.userName: ", req.headers.userName)
    // console.log("typeof req.headers.userName: ", typeof req.headers.userName)
    let userName = null;
    if(typeof req.headers.userName === 'string'){
      userName = JSON.parse(req.headers.userName)["username"]
    } else{
      userName = req.headers.userName
    }
    res.json({
      // username: req.user.username
      username: userName
    })
  });
  
  router.post('/courses', tokenAuthentication, async (req, res) => {
    // logic to create a course
    let newCourse = {
      title : req.body.title,
      description : req.body.description,
      price : req.body.price,
      imageLink : req.body.imageLink,
      published : req.body.published
    }
  
    const courseObj = new Course(newCourse);
    await courseObj.save();
  
    // console.log("courseObj: ", courseObj);
    res.json({ "message": 'Course created successfully', "courseId": courseObj._id})
  });
  
  router.put('/courses/:courseId', tokenAuthentication, async(req, res) => {
    // logic to edit a course
  
    let idNo = req.params.courseId;
    let course = await Course.findByIdAndUpdate(idNo, req.body, { new : true });
    if (course){
      res.json({ message: 'Course updated successfully' });
    } else{
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/courses', tokenAuthentication, async(req, res) => {
    // logic to get all courses
    let course = await Course.find({});
    res.json(course);
  });

  router.use((req, res)=>{
    res.status(404).send("Route Not found!");
  })

export default router;