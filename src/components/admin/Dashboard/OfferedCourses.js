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
import { OFFERED_COURSES } from '../../../gql/gqlQueries';
import { useQuery } from '@apollo/client';



export default function OfferedCourses() {
    const { loading, error, data, refetch } = useQuery(OFFERED_COURSES, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });


    console.log(data)
    return (
        <div>
            <h2>Offered Courses</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell width={"30%"} style={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>ID Code</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Batch</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Semester</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Author Email</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Author Name</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Author Designation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.offeredCourses.map((row) => (
                            row.isAccepted == '1' && <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                    <AutoStoriesIcon style={{ width: '5vh', height: '4vh', color: 'rgb(0,130,190)', }} />&nbsp;&nbsp;{row.courseTitle}
                                </TableCell>
                                <TableCell align="right">{row.offeredCoursesId}</TableCell>
                                <TableCell align="right">{row.batchName}</TableCell>
                                <TableCell align="right">0{row.semesterName}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right"><Button style={{ width: '40%', border: '1px solid orange', color: 'darkorange' }} variant='outlined'>{row.name} </Button></TableCell>
                                <TableCell align="right">{row.designation}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
