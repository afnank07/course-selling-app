import React from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    React.useEffect(()=>{
        axios.get("http://localhost:3000/admin/courses/", {
            headers: { 'Authorization': "Bearer " + JSON.parse(window.localStorage.getItem("MY_JWT_TOKEN")) }
        }).then(resp => {
            console.log("resp: ", resp);
            // console.log("resp: ", typeof JSON.parse(resp))
            setCourses(resp.data);
        }).catch(err => console.log(err));
    },[]);

    return <div>
        <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
        
        {courses.map(c => <Course 
            title={c.title}
            description={c.description}
            price={c.price}
            imageLink={c.imageLink}
            published={c.published}
        />)}
        
        </div>
     </div>
}

function Course(props) {
    // console.log("props: ", props);
    return <div>
        {/* <Grid item lg={12} xs={6} md={8}> */}
            {/* <div> */}
                <Card variant="outlined" style={{display:'flex', width:300, justifyContent:'normal', margin:10}}>
                    <div>
                    <Typography variant="h5">{props.title}</Typography>
                    <Typography variant="h5">{props.description}</Typography>
                    <Typography variant="h5">{props.price}</Typography>
                    <Typography variant="h5">{props.imageLink}</Typography>
                    <Typography variant="h5">{props.published}</Typography>
                    </div>
                </Card>
            {/* </div> */}
        {/* </Grid> */}
    </div>
}

export default ShowCourses;