import { Avatar, Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../../components/learner/NavBar/Navbar'
import { getLearnerObeSheet } from '../../utils/apis'
import Paper from '@mui/material/Paper';
import ChatBot from './ChatBot/ChatBot';
import { useQuery } from '@apollo/client';
import { filterObeCourse, OBE, OBETitle } from '../../gql/gqlQueries';
import BarChart1 from '../../components/learner/OBESheet/BarChart1';
import PieChart2 from '../../components/learner/OBESheet/PieChart2';
import Card from '../../components/learner/OBESheet/Card';
import calculateGrade from '../../utils/functions/gradeCalc';
import { useNavigate } from 'react-router-dom';


function ObeSheet() {
    const semester = [1, 2, 3, 4, 5, 6, 7, 8];
    const user = useSelector(state => state.user.user);
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [filter, setFilter] = useState("")
    const [obeData, setOBEData] = useState([]);
    const navigate = useNavigate();
    const { loading, error, data, refetch } = useQuery(OBE, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });

    const { data: filterObeData, refetch: filterObeRefetch } = useQuery(filterObeCourse, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        },
        variables: {
            title: filter
        }
    });

    const { data: titles, refetch: refetchTitles } = useQuery(OBETitle, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });


    useEffect(() => {
        if (data && data.obe) {
            const output = Object.values(
                data.obe.reduce((acc, item) => {
                    const { courseTitle, ...rest } = item;
                    acc[courseTitle] = acc[courseTitle] || { courseTitle, ...rest, marks: 0, weightage: 0 };
                    acc[courseTitle].marks += item.marks;
                    acc[courseTitle].weightage += item.weightage;
                    return acc;
                }, {})
            );
            setOBEData(output.sort((a, b) => {
                if (a.semesterName < b.semesterName) return -1;
                if (a.semesterName > b.semesterName) return 1;
                return 0;
            }))
        }
    }, data)


    useEffect(() => {
        refetch();
        refetchTitles();
    }, [refetch, refetchTitles])

    useEffect(() => {
        titles && titles.coursesTitle && setFilter(titles.coursesTitle[0])
    }, [titles])

    useEffect(() => {
        filterObeRefetch({
            variables: {
                title: filter
            }
        });
    }, [filter, filterObeRefetch])

    console.log('filter, filterObeData')
    console.log(filter, filterObeData)

    function setCourseBreakdown(item) {
        setFilter(item)
    }


    useEffect(()=> {
        recommendedAnalysisCategory(data['obe'])
    },[])
    

    function recommendedAnalysisCategory(arr) {
        console.log('pppppppppppppppppppppoooo')
        console.log(arr)
        let counts = {};
        let marksArr = [];
        let courseDescriptionArr = [];
        for (let i = 0; i < arr.length; i++) {
            console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
            let category = arr[i].category;
            let marks = parseInt(arr[i].marks);
            let courseDescription = arr[i].courseDescription;
            console.log('a')
            console.log(parseInt(marks))
            if (counts[category]) {
                counts[category]++;
                marksArr[category] += marks;
                courseDescriptionArr[category] += courseDescription;
                console.log('ab')
                console.log(marks)
            } else {
                counts[category] = 1;
                courseDescriptionArr[category] = courseDescription;
                marksArr[category] = marks;
                console.log('ac')
                console.log(parseInt(marks))
            }
        }

        let result = [];
        for (let category in counts) {
            result.push({ category: category, marks: marksArr[category], courseDescription: courseDescriptionArr[category] });
        }
        console.log('courseDescriptionArr', counts)
        console.log(result)
        getObjectNameWithLeastScore(result)
        getObjectNameWithHighestScore(result)
    }

    function getObjectNameWithLeastScore(arr) {
        let minScore = Infinity;
        let objectNameWithLeastScore = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].marks < minScore) {
                minScore = arr[i].marks;
                objectNameWithLeastScore = arr[i].category;
            }
        }
        localStorage.setItem("courseType", JSON.stringify(objectNameWithLeastScore))

    }

    function getObjectNameWithHighestScore(arr) {
        let maxScore = -Infinity;
        let objectNameWithHighestScore = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].marks > maxScore) {
                maxScore = arr[i].marks;
                objectNameWithHighestScore = arr[i];
            }
        }
        // localStorage.setItem("courseType", JSON.stringify(objectNameWithHighestScore));
        console.log('objectNameWithHighestScore');
        console.log(objectNameWithHighestScore);
        localStorage.setItem("analysisObject", JSON.stringify(objectNameWithHighestScore))
    }



    console.log("llllllllllllllllllllll")
    console.log(filterObeData)

    return (

        <>
            <Navbar />
            {
                obeData.length > 0 ?
                    <div>
                        {console.log("data", data, loading, error)}

                        {/* <ChatBot /> */}
                        <br />
                        <Grid container spacing={4} marginTop={4}>
                            <Grid item xs={9}>
                                <h2>➤ Result Visualizations</h2>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant='contained' onClick={() => navigate('/job-recommendation', { state: { JobDescription: getObjectNameWithHighestScore } })}>Recommend Job</Button>
                            </Grid>
                            <Grid item xs={4} ml={4}>
                                {obeData && <PieChart2 data={obeData} />}
                            </Grid>
                            <Grid item xs={7} >
                                <br />
                                <br />
                                <br />
                                <Card data={obeData} data2={data} />
                            </Grid>
                            <Grid item xs={12} align='center'>
                                <Divider />
                            </Grid>
                            <Grid item xs={5.5} style={{ margin: '2vh' }}>

                                <h2>➤ Complete OBE Sheet </h2>
                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 300 }}>
                                    <Table sx={{ minWidth: 650, }} size="small" aria-label="a dense table" stickyHeader>
                                        <TableHead >
                                            <TableRow >
                                                <TableCell align="left" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Course Title</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Code</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Credits</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Instructor</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Semester</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Marks</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Weightage</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Grade</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {obeData && obeData.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{row.courseTitle}</TableCell>
                                                    <TableCell align="right">{row.courseCode}</TableCell>
                                                    <TableCell align="right">{row.courseCredits}.0</TableCell>
                                                    <TableCell align="right">Dr. {row.email.split('@')[0]}</TableCell>
                                                    <TableCell align="right">0{row.semesterName}</TableCell>
                                                    <TableCell align="right"> {row.marks} </TableCell>
                                                    <TableCell align="right">{row.weightage}</TableCell>
                                                    <TableCell align="right">{calculateGrade(row.weightage, row.marks)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </TableContainer>

                            </Grid>
                            <Grid item xs={5.5}>
                                <br />
                                <br />
                                {data && data.obe &&
                                    <BarChart1 data={data.obe} type={"2"} />}
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={5.5} style={{ margin: '2vh' }}>

                                <Grid container >
                                    <Grid item xs={11}>
                                        <h2>➤ Course Breakdown</h2>
                                    </Grid>
                                    <Grid item>
                                        <select onChange={(e) => { setCourseBreakdown(e.target.value) }}>
                                            {titles && titles.coursesTitle && titles.coursesTitle.map((item) =>
                                                <option value={item}>
                                                    {item}
                                                </option>
                                            )}
                                        </select>
                                    </Grid>
                                </Grid>
                                <TableContainer component={Paper} style={{ maxHeight: 300 }}>
                                    <Table sx={{ minWidth: 650, }} size="small" aria-label="a dense table" stickyHeader>
                                        <TableHead >
                                            <TableRow >
                                                <TableCell width={"30%"} style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Activity Type</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Course Title</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Assesment Type</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Managed By</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Marks</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Weightage</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Grade</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filterObeData && filterObeData.filterObeCourse.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    {console.log('row')}
                                                    {console.log(row)}
                                                    <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                                                        {row.type}
                                                    </TableCell>
                                                    <TableCell align="right">{row.courseTitle}</TableCell>
                                                    <TableCell align="right">{row.assessmentType}</TableCell>
                                                    <TableCell align="right">{row.email}</TableCell>
                                                    <TableCell align="right"> 0{row.marks} </TableCell>
                                                    <TableCell align="right">{row.weightage}</TableCell>
                                                    <TableCell align="right">{calculateGrade(row.weightage, row.marks)}</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow key={"row.name"} style={{ backgroundColor: 'rgba(163, 210, 247, .9)', color: 'white' }}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell style={{ display: 'flex', alignItems: 'center' }}>

                                                </TableCell>
                                                <TableCell align="right" ></TableCell>
                                                <TableCell align="right" ></TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold' }}> {filterObeData && filterObeData.filterObeCourse.reduce((acc, curr) => acc + curr.marks, 0)} </TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold' }}> {filterObeData && filterObeData.filterObeCourse.reduce((acc, curr) => acc + curr.weightage, 0)} </TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold' }}> {filterObeData && calculateGrade(filterObeData.filterObeCourse.reduce((acc, curr) => acc + curr.weightage, 0), filterObeData.filterObeCourse.reduce((acc, curr) => acc + curr.marks, 0))} </TableCell>
                                            </TableRow>
                                            {/* <TableCell align="right">{row.weightage}</TableCell> */}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={5.5}>
                                <br />
                                <br />
                                {filterObeData && filterObeData.filterObeCourse && <BarChart1 data={filterObeData.filterObeCourse} type={"1"} />}
                            </Grid>
                            <Grid item xs={5.5} style={{ margin: '2vh' }}>
                                <h2>➤ Semester Wise - OBE Sheet </h2>
                                <Grid item>
                                    <select onChange={(e) => { setSelectedSemester(e.target.value) }}>
                                        {semester && semester.map((item) =>
                                            <option value={item}>
                                                0{item}
                                            </option>
                                        )}
                                    </select>
                                </Grid>
                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 300 }}>
                                    <Table sx={{ minWidth: 650, }} size="small" aria-label="a dense table" stickyHeader>
                                        <TableHead >
                                            <TableRow >
                                                <TableCell align="left" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Course Title</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Code</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Credits</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Instructor</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Semester</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Marks</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Weightage</TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold', background: '#f5f5f5', height: '35px' }}>Grade</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {obeData && obeData.filter(obj => obj.semesterName.includes(selectedSemester)).map((row) => (

                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{row.courseTitle}</TableCell>
                                                    <TableCell align="right">{row.courseCode}</TableCell>
                                                    <TableCell align="right">{row.courseCredits}.0</TableCell>
                                                    <TableCell align="right">Dr. {row.email.split('@')[0]}</TableCell>
                                                    <TableCell align="right">0{row.semesterName}</TableCell>
                                                    <TableCell align="right"> {row.marks} </TableCell>
                                                    <TableCell align="right">{row.weightage}</TableCell>
                                                    <TableCell align="right">{calculateGrade(row.weightage, row.marks)}</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow key={"row.name"} style={{ backgroundColor: 'rgba(163, 210, 247, .9)', color: 'white' }}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell style={{ display: 'flex', alignItems: 'center' }}>

                                                </TableCell>
                                                <TableCell align="right" ></TableCell>
                                                <TableCell align="right" ></TableCell>
                                                <TableCell align="right" ></TableCell>
                                                <TableCell align="right" ></TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold' }}> {obeData && obeData.filter(obj => obj.semesterName.includes(selectedSemester)).reduce((acc, curr) => acc + curr.marks, 0)} </TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold' }}> {obeData && obeData.filter(obj => obj.semesterName.includes(selectedSemester)).reduce((acc, curr) => acc + curr.weightage, 0)} </TableCell>
                                                <TableCell align="right" style={{ fontWeight: 'bold' }}> {obeData && calculateGrade(obeData.filter(obj => obj.semesterName.includes(selectedSemester)).reduce((acc, curr) => acc + curr.weightage, 0), obeData.reduce((acc, curr) => acc + curr.marks, 0))} </TableCell>
                                            </TableRow>
                                        </TableBody>

                                    </Table>
                                </TableContainer>

                            </Grid>
                            <Grid item xs={5.5}>
                                <br />
                                <br />
                                {obeData && obeData &&
                                    <BarChart1 data={obeData.filter(obj => obj.semesterName.includes(selectedSemester))} type={"2"} />}
                            </Grid>
                        </Grid>


                    </div >
                    :
                    <div>
                        No results found, keep in touch for further notice!
                    </div>
            }

        </>
    )
}

export default ObeSheet