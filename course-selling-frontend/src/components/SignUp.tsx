import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function registerUser(){
        axios.post("http://localhost:3000/admin/signup", {
            "username": email,
            "password": password
        }).then(resp => {
            console.log("resp: ", resp.data.message);
            console.log("resp: ", resp.data.token);
            alert(resp.data.message);
            window.localStorage.setItem('MY_JWT_TOKEN', JSON.stringify(resp.data.token));
        }).catch(err => {
            alert(err.response.data.message);
            console.log("err: ", err);
        })
    }

    return (
        <div >
            <div style={{display:'flex', justifyContent:'center', paddingTop:150, marginBottom:10}}>
            <Typography variant={"h6"}>Welcome! SignUp below.</Typography>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Card variant="outlined" style={{padding:20, width:400}}>
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