import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import { GET_RESOURCE_PERSONS } from '../../../gql/gqlQueries';
import { useQuery } from '@apollo/client';




export default function ResourcePersons() {
    const { loading, error, data, refetch } = useQuery(GET_RESOURCE_PERSONS, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });

    console.log('data')
    


    return (
        <div>
            {console.log(data)}
            <h2>All Resource Personals</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell width={"30%"} style={{ fontWeight: 'bold' }}>Users</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Designation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.resourcePersons.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar style={{ width: '5vh', color: 'orange', backgroundColor: 'rgb(0,130,190)' }} />&nbsp;&nbsp;{row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right"><Button style={{ width: '40%', border: '1px solid orange', color: 'darkorange' }} variant='outlined'>{row.designation} </Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
