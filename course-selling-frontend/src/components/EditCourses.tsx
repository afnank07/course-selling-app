import React from 'react'
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Card, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from "recoil";
import { courseIdAtom, courseTitleAtom, courseDescriptionAtom, 
    coursePriceAtom, courseImageLinkAtom, coursePublishedAtom } from "../atom/courseAtom";

function EditCourses () {
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editImageLink, setEditImageLink] = useState("");
    const [editPublished, setEditPublished] = useState("");
    // const [editJwToken, setEditJwToken] = useState("");

    const [courseId, setCourseId] = useRecoilState(courseIdAtom);
    const [courseTitle, setCourseTitle] = useRecoilState(courseTitleAtom);
    const [courseDescription, setCourseDescription] = useRecoilState(courseDescriptionAtom);
    const [coursePrice, setCoursePrice] = useRecoilState(coursePriceAtom);
    const [courseImageLink, setCourseImageLink] = useRecoilState(courseImageLinkAtom);
    const [coursePublished, setCoursePublished] = useRecoilState(coursePublishedAtom);

    useEffect(()=>{
        console.log("courseTitle: ", courseTitle)
        // async function getCourseData(){
        //     try{
        //         const resp = await axios.put("http://localhost:3000/admin/courses/"+courseId, ) 
        //     } catch(err){
        //         console.log(err);
        //     }
        // }
    }, [])

  return (
    <div>
        <div style={{display:'flex', padding:150 }}>
        <div style={{paddingRight:100, paddingLeft:100}}>
            <Card variant="outlined" style={{padding:20, width:400}}>
                <TextField variant='outlined' label='Edit Title' fullWidth={true} onChange={(e)=>{setEditTitle(e.target.value)}} />
                <TextField variant='outlined' label='Edit Description' fullWidth={true} onChange={(e)=>{setEditDescription(e.target.value)}} />
                <TextField variant='outlined' label='Edit Price' fullWidth={true} onChange={(e)=>{setEditPrice(e.target.value)}} />
                <TextField variant='outlined' label='Edit ImageLink' fullWidth={true} onChange={(e)=>{setEditImageLink(e.target.value)}} />
                <TextField variant='outlined' label='Edit Published' fullWidth={true} onChange={(e)=>{setEditPublished(e.target.value)}} />
                <CardActions>
                    <Button size="small" onClick={()=>{

                    }}>Save</Button>
                    <Button size="small" onClick={()=>{
                        if (editTitle) setCourseTitle(editTitle);
                        if (editDescription) setCourseDescription(editDescription);
                        if (editPrice) setCoursePrice(editPrice);
                        if (editImageLink) setCourseImageLink(editImageLink);
                        if (editPublished) setCoursePublished(editPublished);
                    }}>Preview</Button>
                </CardActions>
            </Card>
        </div>
        <div>
            <Card sx={{ maxWidth: 400 }}>
                <CardMedia sx={{ height:200, objectFit: "contain"}}
                component="img"
                image={courseImageLink}
                title={courseTitle} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{courseTitle}</Typography>
                    <Typography gutterBottom  variant="body2" color="text.secondary" component="div">{courseDescription}</Typography>
                    <Typography variant="h5">{coursePrice}/-</Typography>
                    <Typography variant="h5">{coursePublished}</Typography>
                </CardContent>
            </Card>
        </div>
        </div>
    </div>
  )
}

export default EditCourses