import React from "react";
import StyledCard from "./cardStyle";
import { Grid, Typography, Divider } from "@mui/material";
import SubwayIcon from "@mui/icons-material/Subway";
import ExploreIcon from "@mui/icons-material/Explore";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import AssessmentIcon from "@mui/icons-material/Assessment";
function Card({ data, data2, data3 }) {
    console.log("pppppppppppppppp")
    console.log(data2)
    return (
        <div
        >
            {/* <Grid style={{ margin: 20 }}>
                <Typography variant="h4">
                    <strong>Awesome Card</strong>
                </Typography>
            </Grid> */}
            {/* <Grid style={{ margin: 20 }}>
                <Typography>change the screen size to see the effect!</Typography>
            </Grid> */}

            {/* <Typography variant="h6">
                <strong>Hidde icon on breakpoints sm (between 600px - 960px)</strong>
            </Typography> */}
            <Grid container xs={12} spacing={6} mt={.5} >
                <Grid item lg={4} style={{ marginBottom: 25 }}>
                    {data && <StyledCard
                        primary="OBE Learners"
                        secondary="Total Registered Users: "
                        percentage={100.78}
                        color="linear-gradient(60deg, #3498db 80%, rgba(255,202,41,1) 10%)"
                        iconPerformance={AssessmentIcon}
                        data={data.learners}
                        type={"program"}
                    />}
                </Grid>
                <Grid container style={{ marginBottom: 25 }} item lg={4}>
                    {data3 && <StyledCard
                        primary="Resource Persons"
                        secondary="Total Registered Users: "
                        percentage={100.78}
                        color="linear-gradient(60deg, #3498db 80%, rgba(255,202,41,1) 10%)"
                        iconPerformance={AssessmentIcon}
                        data={data3.resourcePersons}
                    />}
                </Grid>
                <Grid container style={{ marginBottom: 25 }} item lg={4}>
                    {data2 && <StyledCard
                        primary="Pending Requests"
                        secondary="Total Courses Approval Requests"
                        percentage={100.78}
                        color="linear-gradient(60deg, #3498db 80%, rgba(255,202,41,1) 10%)"
                        iconPerformance={AssessmentIcon}
                        data={data2.offeredCourses.filter((course) => {
                            if (course.isAccepted == '0')
                                return course
                        })}
                    />}
                </Grid>
                <Grid container style={{ marginBottom: 25 }} item lg={4}>
                    {data2 && <StyledCard
                        primary="Offered Courses"
                        secondary="Total Offered Courses"
                        percentage={100.78}
                        color="linear-gradient(60deg, #3498db 80%, rgba(255,202,41,1) 10%)"
                        iconPerformance={AssessmentIcon}
                        data={data2.offeredCourses.filter((course) => {
                            if (course.isAccepted == '1')
                                return course
                        })}
                    />}
                </Grid>


                <Grid style={{ marginBottom: 25 }} item lg={6}>
                    {/* <StyledCard
                        primary="DonutSmall"
                        secondary="Lorem ipsum dolor sit"
                        percentage={89.4}
                        color="linear-gradient(60deg, #3498db 80%, rgba(255,202,41,1) 10%)"
                        iconPerformance={DonutSmallIcon}

                        data2={data2}
                    /> */}
                </Grid>

                {/* <Grid container item lg={6} style={{ marginBottom: 25 }}>
                        <StyledCard
                            primary="Subway"
                            // secondary="ksdnfkdsgk sdfnsd"
                            percentage={78.8}
                            color="linear-gradient(60deg, rgba(67,160,71,1) 0%, rgba(255,235,59,1) 100%)"
                            iconPerformance={SubwayIcon}
                        />
                    </Grid> */}

            </Grid>
        </div>
    );
}

export default Card;
