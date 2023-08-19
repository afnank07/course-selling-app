import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { userTypeAtom } from "../atom/userTypeAtom";
import { useRecoilState } from "recoil";

function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useRecoilState(userTypeAtom);

    async function registerUser(){
        let ROUTE_URL = "http://localhost:3000/user/signup";
        if (userType === "Admin") ROUTE_URL = "http://localhost:3000/admin/signup";
        try{
            const resp = await axios.post(ROUTE_URL, {
                "username": email,
                "password": password
            })
            
            // console.log("resp: ", resp.data.message);
            // console.log("resp: ", resp.data.token);
            alert(resp.data.message);
            window.localStorage.setItem('MY_JWT_TOKEN', JSON.stringify(resp.data.token));

            if (userType === "Admin"){
                window.location.replace('http://localhost:5173/about');
            } else {
                window.location.replace('http://localhost:5173/');
            }

        } catch(err) {
            // alert(err.response.data.message);
            console.log("err: ", err);
        }
    }


    return (
        <div >
            <div style={{display:'flex', justifyContent:'center', paddingTop:150, marginBottom:10}}>
            <Typography variant={"h6"}>Welcome! SignUp below.</Typography>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Card variant="outlined" style={{padding:20, width:400}}>
                Login as <Select
                        value={userType}
                        label="Age"
                        sx = {{minWidth:150}}
                        onChange={(e)=>{
                            setUserType(e.target.value)
                        }}
                        >
                        <MenuItem value={'User'}>User</MenuItem>
                        <MenuItem value={'Admin'}>Admin</MenuItem> 
                    </Select>
                    <br /> <br />
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        onChange={(e)=>setEmail(e.target.value)}/>
                    <br /> <br />
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        type="password" 
                        onChange={(e)=>setPassword(e.target.value)}/>
                    <br /> <br />
                    <Button size={'large'} variant="contained" onClick={registerUser}>SignUp</Button>
                </Card>
            </div>
        </div>
    )
}

export default SignUp;