import { CircularProgress, Grid } from '@mui/material';
import React from 'react'
import CourseCard from './CourseCard/CourseCard'
import styles from './Products.module.css'
// import SearchBar from './SearchBar/SearchBar';
import NotFound from '../../../utils/assets/notfound.png';
import FilterDropDown from './FilterDropDown/FilterDropDown';
// import Navbar from '../NavBar/Navbar';
// import { addAllProducts } from '../../../store/Actions/user';




export default function Courses({ refetchCourses, title, search, category, loading, data, allProducts }) {
    console.log("www", data)

    return (
        <>
            <div className={styles['container']}>
                <br />
                <br />
                <br />
                <br />
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <h1>{title}</h1>
                    </div>
                    <div style={{ float: 'right', marginTop: '2vh' }}>
                        {/* <FilterDropDown setDistance={''} /> */}
                    </div>
                </div>
                <div className={styles['scrollbar']}>
                    <Grid container rowGap={6} >
                        {
                            data ? data.map(course => title == 'Offered Courses' && course.isAccepted == '1' &&
                                // course.user_email !== user.email && !course.bidAccepted &&
                                // course.long && calcCrow(location.lat, location.long, course.lat, course.long) <= distance &&
                                <>
                                    {console.log('calcCrow(location.lat, location.long, course.lat, course.long))')}
                                    {console.log(course)}
                                    {/* {console.log(course.long && calcCrow(location.lat, location.long, course.lat, course.long))} */}
                                    {category.toLowerCase() === 'all' &&
                                        <Grid item lg={3}>
                                            <CourseCard refetchCourses={refetchCourses} course={course} />
                                        </Grid>
                                    }
                                    {course.category && category.toLowerCase() === course.category.toLowerCase() &&
                                        <Grid item lg={3}>
                                            <CourseCard course={course} refetchCourses={refetchCourses} />
                                        </Grid>
                                    }
                                </>
                            ) :
                                !loading && (<div style={{ justifyContent: 'center', textAlign: 'center', width: '100%' }}>
                                    <img alt="not found" width="50%" height="100%" src={NotFound} />
                                </div>)
                        }
                        {
                            data ? data.map(course => title == 'Enrolled Courses' &&
                                // course.user_email !== user.email && !course.bidAccepted &&
                                // course.long && calcCrow(location.lat, location.long, course.lat, course.long) <= distance &&
                                <>
                                    {console.log(category, course)}
                                    {console.log('calcCrow(location.lat, location.long, course.lat, course.long))')}
                                    {/* {console.log(course.long && calcCrow(location.lat, location.long, course.lat, course.long))} */}
                                    {category.toLowerCase() === 'all' &&
                                        <Grid item lg={3}>
                                            <CourseCard refetchCourses={refetchCourses} type="enrolled" course={course} />
                                        </Grid>
                                    }
                                    {course.category && category.toLowerCase() === course.category.toLowerCase() &&
                                        <Grid item lg={3}>
                                            <CourseCard type="enrolled" refetchCourses={refetchCourses} course={course} />
                                        </Grid>
                                    }
                                </>
                            ) :
                                !loading && (<div style={{ justifyContent: 'center', textAlign: 'center', width: '100%' }}>
                                    <img alt="not found" width="50%" height="100%" src={NotFound} />
                                </div>)
                        }
                        {
                            data ? data.map(course => title == 'Recommended Courses' &&
                                // course.user_email !== user.email && !course.bidAccepted &&
                                // course.long && calcCrow(location.lat, location.long, course.lat, course.long) <= distance &&
                                <>
                                    {/* {console.log(category, course)} */}
                                    {/* {console.log('calcCrow(location.lat, location.long, course.lat, course.long))')} */}
                                    {/* {console.log(course.long && calcCrow(location.lat, location.long, course.lat, course.long))} */}

                                    <Grid item lg={3}>
                                        <CourseCard type='recommended' refetchCourses={refetchCourses} course={course} />
                                    </Grid>

                                </>
                            ) :
                                !loading && (<div style={{ justifyContent: 'center', textAlign: 'center', width: '100%' }}>
                                    <img alt="not found" width="50%" height="100%" src={NotFound} />
                                </div>)
                        }
                        {loading && < CircularProgress color="secondary" style={{ position: 'absolute', marginInline: '45%', marginTop: '10vh' }} />}
                    </Grid>
                </div>
            </div >
        </>
    )
}
