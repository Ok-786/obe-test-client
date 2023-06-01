import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_LEARNERS } from '../../../gql/gqlQueries';




export default function Learners() {
    const { loading, error, data, refetch } = useQuery(GET_LEARNERS, {
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
            <h2>All Learners</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell width={"30%"} style={{ fontWeight: 'bold' }}>Users</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Semester</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Section</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Roll No.</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.learners.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar style={{ width: '5vh', color: 'rgb(0,130,190)', backgroundColor: 'orange', border: '3px solid rgb(0,130,190)' }} />&nbsp;&nbsp;{row.email ? row.email.substring(0, row.email.indexOf('@')) :'Nill'}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right"> {row.semester_name ? 0 + row.semester_name : "1"} </TableCell>
                                <TableCell align="right">{row.section ? row.section : "A"}</TableCell>
                                <TableCell align="right">{row.id }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    )
}
