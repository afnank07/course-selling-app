// const jwt = require('jsonwebtoken');
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface userType1 {
  username: string,
  password: string,
  role: string,
  iat: number,
  exp: number
}

interface userType2 {
  userDetails: userType1,
  iat: number,
  exp: number
}

const jwtSecretKey = String(Math.floor(Math.random() * 10000000));
// console.log("jwtSecretKey generated: ", jwtSecretKey)

function tokenAuthentication(req: Request, res: Response, next: NextFunction){
  let token = req.headers.authorization;
  // console.log("token in fxn: ", token)
  // console.log("jwtSecretKey in fxn: ", jwtSecretKey)
  if (token){
    token = token.replace("Bearer ", "");
    // console.log("token in if: ", token)
    jwt.verify(token, jwtSecretKey, (err, user)=>{
      if (err) {
        res.status(403).json({ "message": 'You have been logged-out! Please login again.' })
      }else{
        // if ('username' in user){
        //   req.headers['userName'] = user.username;
        // }else{
        //   req.headers['userName'] = user.userDetails.username;
        // }
        // req.user = user;
        // console.log("req.headers: ", req.headers);
        // console.log("user: ", user);
        
        // req.headers['userName'] = user;
        req.headers['userName'] = JSON.stringify(user);
        next();
      }
  })} else{
    res.status(401).json({ "message": 'You have been logged-out! Please login again.' })
  }
}

// module.exports = { tokenAuthentication, jwtSecretKey };
export { tokenAuthentication, jwtSecretKey };