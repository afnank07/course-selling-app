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

function ShowCourses() {
    const [courses, setCourses] = useState([]);
    
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    useEffect(()=>{
        axios.get("http://localhost:3000/admin/courses/", {
            headers: { 'Authorization': "Bearer " + JSON.parse(window.localStorage.getItem("MY_JWT_TOKEN")) }
        }).then(resp => {
            console.log("resp: ", resp);
            // console.log("resp: ", typeof JSON.parse(resp))
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
        />)}
        
        </div>
        </Grid>
     </div>
}

function Course(props) {
    // console.log("props: ", props);
    // return <div>
    //     {/* <Grid item lg={12} xs={6} md={8}> */}
    //         {/* <div> */}
    //             <Card variant="outlined" style={{display:'flex', width:300, justifyContent:'normal', margin:10}}>
    //                 <div>
    //                 <Typography variant="h5">{props.title}</Typography>
    //                 <Typography variant="h5">{props.description}</Typography>
    //                 <Typography variant="h5">{props.price}</Typography>
    //                 <Typography variant="h5">{props.imageLink}</Typography>
    //                 <Typography variant="h5">{props.published}</Typography>
    //                 </div>
    //             </Card>
    //         {/* </div> */}
    //     {/* </Grid> */}
    // </div>

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
                    <Button size="small">Purchase</Button>
                    <Button size="small">Edit</Button>
                </CardActions>
            </Card>
        {/* </div> */}
        </Grid>
    </div>

}

export default ShowCourses;