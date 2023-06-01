import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useEffect } from 'react';
import './AddStaff.css';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { axiosRegisterCourse } from '../../../utils/apis';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { OFFERED_COURSES, REGISTER_COURSE } from '../../../gql/gqlQueries';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    // bgcolor: 'orange',
    border: '2px solid orange',
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
};

export default function RecommendationDetails({ open, handleOpen, handleClose, course }) {



    return (
        <div>
            {/* {console.log('aaaaaaaaaa', detail)} */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        <div style={{ background: 'rgb(97, 183, 235,.9)', padding: '3vh', borderRadius: '15px', color: 'white' }}>
                            <div style={{ justifyContent: 'center', textAlign: 'center', display: 'grid', }}>
                                <h2  >{course.courseTitle}</h2>
                                <br />
                            </div>
                            <div>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <h4>Creator: <span style={{ fontWeight: 'normal', fontSize:'18px' }}>{course.author}</span></h4>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h4>Ratings: <span style={{ fontWeight: 'normal', }}>{course.rating}</span></h4>
                                    </Grid>
                                    
                                    <Grid item xs={12} >
                                        <h4>Description:</h4>
                                        <p>
                                            {course.description}
                                        </p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <a href={course.link} style={{ textDecoration: 'none', color: 'black' }}><Button variant='contained' fullWidth >Enroll Now</Button></a>
                                    </Grid>
                                    <div style={{ backgroundColor: 'red', padding: '1.5vh', borderRadius: '5px', marginTop: '2vh' }}>
                                        <span style={{ color: 'yellow' }}><span style={{ color: 'white', fontWeight: 'bold' }}>Note:</span>  This course is available on the external link and is recommended by looking at you progress</span>
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    }
                </Box>
            </Modal>
        </div>
    );
}




