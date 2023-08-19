import express from "express";
import mongoose from "mongoose";
import adminRouter from './routes/adminRoute';
import userRouter from './routes/userRoute';
import cors from 'cors';
import dotenv from 'dotenv'

const app = express();
app.use(cors());
dotenv.config();

// app.use(cors({
//   credentials: true,
//   origin: "http://localhost:5173/"
// }));

app.use(express.json());
app.use('/admin', adminRouter);
app.use('/user', userRouter);

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pqhj8hj.mongodb.net/`, { dbName: "courses" });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
