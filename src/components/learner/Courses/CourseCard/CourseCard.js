import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Grid, Rating } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { axiosGetAllUsers, axiosGetDetails } from '../../../../utils/apis';
import { useDispatch, useSelector } from 'react-redux';
// import { updateFav } from '../../../../store/Actions/user';
// import Products from '../Products';
import ViewDetail from '../../ViewDetail/ViewDetail';
import { useNavigate } from 'react-router-dom';
import coursePic from '../../../../utils/assets/course.png';
import { useQuery } from '@apollo/client';
import { COURSE_DETAIL } from '../../../../gql/gqlQueries';
import RecommendationDetails from '../../ViewDetail/RecommendationDetails';

const CourseCard = React.memo(({ course, refetchCourses, type }) => {
    const [hover, setHover] = React.useState(false);
    const user = useSelector(state => state.user.user);
    const [fav, setFav] = React.useState(user.wish_list && user.wish_list.includes(course.id));
    const navigate = useNavigate();
    const { loading, error, data, refetch } = useQuery(COURSE_DETAIL, {
        variables: { id: course.offeredCoursesId },
        notifyOnNetworkStatusChange: true, // Enable the loading state
    });

    console.log("111111", data, course)


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFav = async (isAdd) => {
        if (isAdd) {

            setFav(true)
        } else {
            setFav(false)
        }
    }

    if (type == 'recommended') {
        return (
            <div style={{ width: '40vh', cursor: 'pointer' }} >
                <>
                    {course && <RecommendationDetails type={type} open={open} handleOpen={handleOpen} handleClose={handleClose}  course={course} />}
                </>
                <Card style={{ paddingInline: '3vh', paddingBottom: '2vh', borderRadius: '15px' }}>
                    <Box
                        sx={{ position: 'relative', paddingTop: '20px' }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <CardMedia
                            component="img"
                            height="280vh"
                            width="100%"
                            style={{ objectFit: 'contain', backgroundColor: 'rgb(80,50,40,.1)', width: '100%', borderRadius: '20px', padding: '2vh' }}
                            // image={`http://localhost:8000/${course.image}`}
                            image={course.image ? course.image : coursePic}
                            alt="green iguana"

                        />
                        {/* {console.log(`http://localhost:8000/${course.image}`)} */}
                        {hover ?
                            <div>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        // border: '1px solid black',
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: 'rgb(255,255,255,.8)',
                                        border: '1px solid orange',
                                        color: 'purple',
                                        borderRadius: '20px',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Button variant='contained' onClick={handleOpen} color="primary" style={{ marginBlock: '50%', borderRadius: '10px', border: '2px solid orange', color: 'white', backgroundColor: 'orange' }}><b>View Details</b></Button>
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 5,
                                        // border: '1px solid black',
                                        // width: '42%',
                                        // bgcolor: 'rgb(255,255,255,.8)',
                                        color: 'rgb(23, 96, 123)',
                                        // padding: '5px 20px',
                                        // borderRadius: '20px',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    {/* {
                                        fav ? <StarIcon fontSize='large' onClick={() => handleFav(false)} /> :
                                            <StarBorderIcon fontSize='large' onClick={() => handleFav(true)} />
                                    } */}
                                </Box>
                            </div> :
                            <>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        marginTop: '-17%',
                                        marginInline: '10%',
                                        // border: '1px solid black',
                                        width: '80%',
                                        bgcolor: 'rgb(255,255,255,.8)',
                                        color: '#f58109',
                                        padding: '5px 20px',
                                        borderRadius: '20px',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography variant="body2"><b>Recommended Course</b></Typography>
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 5,
                                        // border: '1px solid black',
                                        // width: '42%',
                                        // bgcolor: 'rgb(255,255,255,.8)',
                                        color: 'rgb(33, 116, 193)',
                                        // padding: '5px 20px',
                                        // borderRadius: '20px',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    {/* {
                                        fav ? <StarIcon fontSize='large' onClick={() => handleFav(false)} /> :
                                            <StarBorderIcon fontSize='large' onClick={() => handleFav(true)} />
                                    } */}
                                </Box>
                            </>
                        }
                    </Box>
                    <div style={{ marginTop: '10px' }}>
                        <Grid container onClick={() => navigate(`/coursedetail/${course.id}`, { state: { course } })}>
                            <Grid item xs={12}  >
                                <Typography variant="body1"><b>{course.title ? course.title : course.name}</b></Typography>
                            </Grid>
                        </Grid>
                        <Grid container gap={2} style={{ marginTop: '10px' }}>
                            <Grid item xs={2}>
                                <Avatar style={{ backgroundColor: 'rgb(23, 96, 153)', zIndex: 100 }}
                                // onClick={() => navigate(`/userprofile/${user.id}`, { state: { user: { name: course.user_name, email: course.user_email, detail: course.detail, rating: course.user_rating, reported: course.reported }, isOther: true } })} 
                                />
                            </Grid>
                            <Grid item xs={5}
                            // onClick={() => navigate(`/coursedetail/${course.id}`, { state: { course } })}
                            >
                                {/* <Typography variant="body2" color='grey'>Type: <b>{course.type.toLowerCase() == 'selection' ? course.type : 'Bidding'}</b></Typography> */}
                                <Rating
                                    name="rating"
                                    size='large'
                                    value={Math.floor(course ? course.rating : 1)}
                                    readOnly={true}
                                />
                            </Grid>
                            <Grid item xs={12}
                            // onClick={() => navigate(`/coursedetail/${course.id}`, { state: { course } })}
                            >
                                <Typography variant="body2" color='grey'>creator</Typography>
                                <Typography variant="body2" color='grey'><b>{course && course.author}</b></Typography>
                            </Grid>
                            
                        </Grid>
                    </div>
                </Card >
            </div >
        )
    }
    return (
        <div style={{ width: '40vh', cursor: 'pointer' }} >
            <>
                {data && <ViewDetail refetchCourses={refetchCourses} type={type} open={open} handleOpen={handleOpen} handleClose={handleClose} detail={data.course} course={course} />}
            </>
            <Card style={{ paddingInline: '3vh', paddingBottom: '2vh', borderRadius: '15px' }}>
                <Box
                    sx={{ position: 'relative', paddingTop: '20px' }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <CardMedia
                        component="img"
                        height="280vh"
                        width="100%"
                        style={{ objectFit: 'contain', backgroundColor: 'rgb(80,50,40,.3)', width: '100%', borderRadius: '20px', padding: '3vh' }}
                        // image={`http://localhost:8000/${course.image}`}
                        image={coursePic}
                        alt="green iguana"

                    />
                    {console.log(`http://localhost:8000/${course.image}`)}
                    {hover ?
                        <div>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    // border: '1px solid black',
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: 'rgb(255,255,255,.8)',
                                    border: '1px solid orange',
                                    color: 'purple',
                                    borderRadius: '20px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <Button variant='contained' onClick={handleOpen} color="primary" style={{ marginBlock: '50%', borderRadius: '10px', border: '2px solid orange', color: 'white', backgroundColor: 'orange' }}><b>View Details</b></Button>
                            </Box>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 20,
                                    right: 5,
                                    // border: '1px solid black',
                                    // width: '42%',
                                    // bgcolor: 'rgb(255,255,255,.8)',
                                    color: 'rgb(23, 96, 123)',
                                    // padding: '5px 20px',
                                    // borderRadius: '20px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                {/* {
                                    fav ? <StarIcon fontSize='large' onClick={() => handleFav(false)} /> :
                                        <StarBorderIcon fontSize='large' onClick={() => handleFav(true)} />
                                } */}
                            </Box>
                        </div> :
                        <>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    marginTop: '-17%',
                                    marginInline: '20%',
                                    // border: '1px solid black',
                                    width: '60%',
                                    bgcolor: 'rgb(255,255,255,.8)',
                                    color: '#f58109',
                                    padding: '5px 20px',
                                    borderRadius: '20px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="body2"><b>Featured Course</b></Typography>
                            </Box>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 20,
                                    right: 5,
                                    // border: '1px solid black',
                                    // width: '42%',
                                    // bgcolor: 'rgb(255,255,255,.8)',
                                    color: 'rgb(33, 116, 193)',
                                    // padding: '5px 20px',
                                    // borderRadius: '20px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                {/* {
                                    fav ? <StarIcon fontSize='large' onClick={() => handleFav(false)} /> :
                                        <StarBorderIcon fontSize='large' onClick={() => handleFav(true)} />
                                } */}
                            </Box>
                        </>
                    }
                </Box>
                <div style={{ marginTop: '10px' }}>
                    <Grid container onClick={() => navigate(`/coursedetail/${course.id}`, { state: { course } })}>
                        <Grid item xs={10}  >
                            <Typography variant="h5"><b>{course.courseTitle ? course.courseTitle : course.name}</b></Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <div style={{ background: 'rgb(33, 116, 193)', cursor: 'pointer', borderRadius: '25px', paddingInline: '15px', color: 'white', float: 'right', display: 'flex' }}>{data ? data.course.courseCode : 0}</div>
                        </Grid>
                    </Grid>
                    <Grid container gap={2} style={{ marginTop: '10px' }}>
                        <Grid item xs={2}>
                            <Avatar style={{ backgroundColor: 'rgb(23, 96, 153)', zIndex: 100 }}
                            // onClick={() => navigate(`/userprofile/${user.id}`, { state: { user: { name: course.user_name, email: course.user_email, detail: course.detail, rating: course.user_rating, reported: course.reported }, isOther: true } })} 
                            />
                        </Grid>
                        <Grid item xs={2}
                        // onClick={() => navigate(`/coursedetail/${course.id}`, { state: { course } })}
                        >
                            <Typography variant="body2" color='grey'>creator</Typography>
                            <Typography variant="body1" color='grey'><b>{data && data.course.email.split('@')[0]}</b></Typography>
                        </Grid>
                        <Grid item xs={5}
                        // onClick={() => navigate(`/coursedetail/${course.id}`, { state: { course } })}
                        >
                            {/* <Typography variant="body2" color='grey'>Type: <b>{course.type.toLowerCase() == 'selection' ? course.type : 'Bidding'}</b></Typography> */}
                            <Rating
                                name="rating"
                                size='large'
                                value={Math.floor(data ? data.course.courseRating : 1)}
                                readOnly={true}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Card >
        </div >
    );
})

export default CourseCard;