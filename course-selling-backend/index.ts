// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const adminRouter = require('./routes/adminRoute');
// const userRouter = require('./routes/userRoute');

import express from "express";
import mongoose from "mongoose";
import adminRouter from './routes/adminRoute';
import userRouter from './routes/userRoute';
import cors from 'cors';

const app = express();
app.use(cors());

// app.use(cors({
//   credentials: true,
//   origin: "http://localhost:5173/"
// }));

app.use(express.json());
app.use('/admin', adminRouter);
app.use('/user', userRouter);

// Connect to MongoDB
mongoose.connect("mongodb+srv://<SECRET_KEY>.mongodb.net/", { dbName: "courses" });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
