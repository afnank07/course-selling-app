import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userTypeAtom } from '../atom/userTypeAtom';

function AppBar(){
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const userType = useRecoilValue(userTypeAtom);

    useEffect(()=>{
        let ROUTE_URL = "http://localhost:3000/user/me";
        if (userType === "Admin") ROUTE_URL = "http://localhost:3000/admin/me";

        axios.get(ROUTE_URL, {
            headers: {"Authorization" :"Bearer " + JSON.parse(window.localStorage.getItem('MY_JWT_TOKEN'))}
        }).then(resp=>{
            // console.log("resp.data.username: ", resp.data.username)
            setEmail(resp.data.username)}).catch(err => console.log(err));
    }, []);

    if (email){
        // console.log("email: ", email);
        return (
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between'}}>
                <h2>Smart Courses</h2>
                <div>
                    {userType=='Admin' && <Button
                    variant="contained" 
                    style={{marginRight:'1rem'}}
                    onClick={ () => {navigate('./about')}}
                    >Add Courses</Button>}
                    {userType=='User' && <Button
                    variant="contained" 
                    style={{marginRight:'1rem'}}
                    onClick={ () => {navigate('./purchased')}}
                    >Show Purchased Courses</Button>}
                    {userType=='User' && <Button
                    variant="contained" 
                    style={{marginRight:'1rem'}}
                    onClick={ () => {navigate('./courses')}}
                    >Show All Courses</Button>}
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
            <h2>Smart Courses</h2>
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