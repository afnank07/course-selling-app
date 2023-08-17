import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AppBar(){
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3000/admin/me/", {
            headers: {"Authorization" :"Bearer " + JSON.parse(window.localStorage.getItem('MY_JWT_TOKEN'))}
        }).then(resp=>setEmail(resp.data.username)).catch(err => console.log(err));
    }, []);

    if (email){
        console.log("email: ", email);
        return (
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between'}}>
                <h2>Elevate</h2>
                <div>
                    <Typography 
                        variant="contained" 
                        style={{marginRight:'1rem'}}
                    >{email}</Typography>
                    <Button 
                        variant="contained"
                        onClick={ () => {
                            window.localStorage.setItem('MY_JWT_TOKEN', null);
                            window.location.replace('http://localhost:5173/');
                        }}
                    >LogOut</Button>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'space-between'}}>
            <h2>Elevate</h2>
            <div>
                <Button 
                    variant="contained" 
                    style={{marginRight:'1rem'}}
                    onClick={ () => {navigate('./signup')}}
                >signup</Button>
                <Button 
                    variant="contained"
                    onClick={ () => {navigate('./signin')}}
                >signin</Button>
            </div>
        </div>
    )
}

export default AppBar;