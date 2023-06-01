import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import { axiosGetAllProducts } from '../../../utils/apis';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { COURSE_APPROVE, OFFERED_COURSES } from '../../../gql/gqlQueries';
import { useMutation, useQuery } from '@apollo/client';
import AddTaskIcon from '@mui/icons-material/AddTask';


export default function CoursesApproval() {
    const { loading, error, data, refetch } = useQuery(OFFERED_COURSES, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });

    const [approveCourse, { loading: loading1, error: error1, data: data1 }] = useMutation(COURSE_APPROVE, {
        notifyOnNetworkStatusChange: true,
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        },
        variables: {
            id: '123' // Replace 123 with the actual ID value you want to pass in
        }
    });

    const courseApprove = (courseId) => {
        console.log(courseId);
        approveCourse({ variables: { courseId } });
        refetch();
    }

    console.log(data)
    return (
        <div>
            <h2>Approval Pending</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell width={"30%"} style={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Code</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Batch</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Semester</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Author Email</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Author Name</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Author Designation</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Approve</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.offeredCourses.map((row) => (
                            row.isAccepted !== '1' && <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                    <AutoStoriesIcon style={{ width: '5vh', height: '4vh', color: 'rgb(0,130,190)', }} />&nbsp;&nbsp;{row.courseTitle}
                                </TableCell>
                                <TableCell align="right">{row.courseCode}</TableCell>
                                <TableCell align="right">{row.batchName}</TableCell>
                                <TableCell align="right">0{row.semesterName}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right"><Button style={{ width: '40%', border: '1px solid orange', color: 'darkorange' }} variant='outlined'>{row.name} </Button></TableCell>
                                <TableCell align="right">{row.designation}</TableCell>
                                <TableCell align="right" style={{ color: '#1c65c6', cursor: 'pointer' }} onClick={() => courseApprove(row.offeredCoursesId)}><AddTaskIcon /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
