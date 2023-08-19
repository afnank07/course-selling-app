import React from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { courseIdAtom, courseTitleAtom, courseDescriptionAtom, coursePriceAtom, courseImageLinkAtom, coursePublishedAtom } from "../atom/courseAtom";
import { userTypeAtom } from './../atom/userTypeAtom';

function ShowCourses() {
    const [courses, setCourses] = useState([]);
    const userType = useRecoilValue(userTypeAtom);
    // const [courseId, setCourseId] = useRecoilState(courseIdAtom);
    // const navigate = useNavigate();
    
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    useEffect(()=>{
        let ROUTE_URL = "http://localhost:3000/user/courses";
        if (userType === "Admin") ROUTE_URL = "http://localhost:3000/admin/courses";

        axios.get(ROUTE_URL, {
            headers: { 'Authorization': "Bearer " + JSON.parse(window.localStorage.getItem("MY_JWT_TOKEN")) }
        }).then(resp => {
            // console.log("resp: ", resp);
            // console.log("resp: ", JSON.parse(resp))
            setCourses(resp.data);
        }).catch(err => console.log(err));
    },[]);

    return <div>
        <Grid container spacing={1}>
        <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
        {/* <div> */}
        {courses.map(c => <Course 
            title={c.title}
            description={c.description}
            price={c.price}
            imageLink={c.imageLink}
            published={c.published}
            id={c._id}
        />)}
        
        </div>
        </Grid>
     </div>
}

function Course(props) {
    const navigate = useNavigate();
    const userType = useRecoilValue(userTypeAtom);
    const [courseId, setCourseId] = useRecoilState(courseIdAtom);
    const [courseTitle, setCourseTitle] = useRecoilState(courseTitleAtom);
    const [courseDescription, setCourseDescription] = useRecoilState(courseDescriptionAtom);
    const [coursePrice, setCoursePrice] = useRecoilState(coursePriceAtom);
    const [courseImageLink, setCourseImageLink] = useRecoilState(courseImageLinkAtom);
    const [coursePublished, setCoursePublished] = useRecoilState(coursePublishedAtom);

    return <div>
        <Grid item lg={12} xs={2} md={2} style={{ padding: 30 }}>
        {/* <div style={{ padding: 30 }} > */}
            <Card sx={{ maxWidth: 400 }}>
                <CardMedia sx={{ height:200, objectFit: "contain"}}
                component="img"
                image={props.imageLink}
                title={props.title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{props.title}</Typography>
                    <Typography gutterBottom  variant="body2" color="text.secondary" component="div">{props.description}</Typography>
                    <Typography variant="h5">{props.price}/-</Typography>
                    <Typography variant="h5">{props.published}</Typography>
                </CardContent>
                <CardActions>
                    {userType=='Admin' && <Button size="small" onClick={ () => {
                        setCourseId(props.id)
                        setCourseTitle(props.title)
                        setCourseDescription(props.description)
                        setCoursePrice(props.price)
                        setCourseImageLink(props.imageLink)
                        setCoursePublished(props.published)
                        navigate('../edit')
                        }}>Edit</Button>}
                    {userType=='User' && <Button size="small" onClick={ async () => {
                        setCourseId(props.id)
                        try{
                            // console.log("props.id: ", props.id)
                            const resp = await axios.post("http://localhost:3000/user/courses/"+String(props.id),{}, {
                                headers: { 'Authorization': "Bearer " + JSON.parse(window.localStorage.getItem("MY_JWT_TOKEN")) }
                            })
                            alert(resp.data.message);
                        } catch (err){
                            console.log(err)
                        }
                        // navigate('../purchased')
                        }}>Purchase</Button>}
                </CardActions>
            </Card>
        {/* </div> */}
        </Grid>
    </div>

}

export default ShowCourses;