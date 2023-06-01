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

export default function ViewDetail({ refetchCourses, open, handleOpen, handleClose, detail, course, type }) {
    const learner = JSON.parse(localStorage.getItem('user'))
    const [enrollCourse, { loading, error, data }] = useMutation(REGISTER_COURSE, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        },
        variables: { id: detail.courseId }
    });
    const { refetch } = useQuery(OFFERED_COURSES, {
        notifyOnNetworkStatusChange: true,
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });

    // console.log("xxxxxxx", course)

    useEffect(() => {
        refetch();
    }, [refetch, data]);

    function registerCourse() {
        try {
            enrollCourse({ variables: { courseId: detail.courseId } });

        } catch (err) {
            toast.success(err)
        }
    }

    useEffect(() => {
        data && toast.success("Course successfully enrolled!")
        error && toast.success(error.message)
    }, [data, error])

    
    
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
                    {detail &&
                        <div style={{ background: 'rgb(97, 183, 235,.9)', padding: '3vh', borderRadius: '15px', color: 'white' }}>
                            <div style={{ justifyContent: 'center', textAlign: 'center', display: 'grid', }}>
                                <h2  >{course.courseTitle}</h2>
                                <br />
                            </div>
                            <div>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <h4>Code: <span style={{ fontWeight: 'normal', }}>{detail.courseCode}</span></h4>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h4>Creator: <span style={{ fontWeight: 'normal' }}>{detail.email}</span></h4>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h4>Category: <span style={{ fontWeight: 'normal' }}>{detail.category}</span></h4>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h4>Total Credits: <span style={{ fontWeight: 'normal' }}>{detail.courseCredits}</span></h4>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <h4>Description:</h4>
                                        <p>
                                            {detail.courseDescription}
                                        </p>
                                    </Grid>
                                    <div style={{ marginTop: '2vh', width: '100%' }}>
                                        {
                                            type == "enrolled" ?
                                                <Button variant='contained' disabled>
                                                    Alreay Enrolled
                                                </Button>
                                                :
                                                <Button variant='contained' fullWidth onClick={registerCourse}>Enroll New</Button>
                                        }
                                    </div>
                                    <div style={{ backgroundColor: 'red', padding: '1.5vh', borderRadius: '5px', marginTop: '2vh' }}>
                                        <span style={{ color: 'yellow' }}><span style={{ color: 'white', fontWeight: 'bold' }}>Note:</span>  This course is only offered at semester <b>0{course.semesterName}</b> and is currently Opened for enrollment for batch <b>{course.batchName}</b></span>
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




